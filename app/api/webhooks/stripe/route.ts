import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  InventoryAdjustmentReason,
  PaymentStatus,
} from "@/lib/generated/prisma/enums";
import { calculateInventoryStatus } from "@/lib/inventory";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");

    return NextResponse.json(
      { error: "Webhook is not configured." },

      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },

      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,

      signature,

      webhookSecret,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);

    return NextResponse.json(
      { error: "Invalid Stripe signature." },

      { status: 400 },
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object;

      if (checkoutSession.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      const orderId =
        checkoutSession.metadata?.orderId ??
        checkoutSession.client_reference_id;

      if (!orderId) {
        console.error(
          "Completed Stripe Checkout Session is missing an order ID.",
        );

        return NextResponse.json(
          { error: "Order ID is missing." },

          { status: 400 },
        );
      }

      await fulfillPaidOrder(orderId, checkoutSession);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },

      { status: 500 },
    );
  }
}

async function fulfillPaidOrder(
  orderId: string,

  checkoutSession: Stripe.Checkout.Session,
) {
  await prisma.$transaction(async (transaction) => {
    const order = await transaction.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: true,
      },
    });

    if (!order) {
      throw new Error(`Order ${orderId} was not found.`);
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return;
    }

    for (const item of order.items) {
      const inventoryItem = await transaction.inventoryItem.findUnique({
        where: {
          productId: item.productId,
        },
      });

      if (!inventoryItem) {
        throw new Error(
          `Inventory was not found for product ${item.productId}.`,
        );
      }

      const nextQuantity = inventoryItem.quantityOnHand - item.quantity;

      if (nextQuantity < 0) {
        throw new Error(
          `Insufficient inventory for product ${item.productId}.`,
        );
      }

      const nextStatus = calculateInventoryStatus(
        nextQuantity,

        inventoryItem.lowStockThreshold,
      );

      await transaction.inventoryItem.update({
        where: {
          id: inventoryItem.id,
        },

        data: {
          quantityOnHand: nextQuantity,

          status: nextStatus,

          adjustments: {
            create: {
              changeAmount: -item.quantity,

              reason: InventoryAdjustmentReason.ORDER_PLACED,

              note: `Paid order: ${order.id}`,
            },
          },
        },
      });
    }

    const paymentIntentId =
      typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : (checkoutSession.payment_intent?.id ?? null);

    await transaction.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentStatus: PaymentStatus.PAID,

        stripeCheckoutSessionId: checkoutSession.id,

        stripePaymentIntentId: paymentIntentId,

        paidAt: new Date(),
      },
    });
  });
}
