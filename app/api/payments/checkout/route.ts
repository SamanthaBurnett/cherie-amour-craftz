import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PaymentStatus } from "@/lib/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";

type CheckoutRequestBody = {
  orderId?: string;
};

function dollarsToCents(value: unknown): number {
  const amount = Number(String(value));

  if (!Number.isFinite(amount)) {
    throw new Error("Invalid monetary amount.");
  }

  return Math.round(amount * 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    const orderId = body.orderId?.trim();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },

        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        customer: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },

        { status: 404 },
      );
    }

    if (order.items.length === 0) {
      return NextResponse.json(
        { error: "Cannot create payment for an empty order." },

        { status: 400 },
      );
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json(
        { error: "This order has already been paid." },

        { status: 409 },
      );
    }

    const lineItems = order.items.map((item) => ({
      quantity: item.quantity,

      price_data: {
        currency: "usd",

        unit_amount: dollarsToCents(item.unitPrice),

        product_data: {
          name: item.product.title,

          metadata: {
            productId: item.productId,
          },
        },
      },
    }));

    if (Number(order.shipping) > 0) {
      lineItems.push({
        quantity: 1,

        price_data: {
          currency: "usd",

          unit_amount: dollarsToCents(order.shipping),

          product_data: {
            name: "Shipping",

            metadata: {
              productId: "shipping",
            },
          },
        },
      });
    }

    if (Number(order.tax) > 0) {
      lineItems.push({
        quantity: 1,

        price_data: {
          currency: "usd",

          unit_amount: dollarsToCents(order.tax),

          product_data: {
            name: "Estimated tax",

            metadata: {
              productId: "tax",
            },
          },
        },
      });
    }

    const origin = request.nextUrl.origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: order.customer.email,

      client_reference_id: order.id,

      metadata: {
        orderId: order.id,
      },

      payment_intent_data: {
        metadata: {
          orderId: order.id,
        },
      },

      line_items: lineItems,

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/payment/cancel?order_id=${order.id}`,
    });

    if (!checkoutSession.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        stripeCheckoutSessionId: checkoutSession.id,

        paymentStatus: PaymentStatus.PROCESSING,
      },
    });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error("Failed to create Stripe Checkout Session", error);

    return NextResponse.json(
      { error: "Failed to create payment session." },

      { status: 500 },
    );
  }
}
