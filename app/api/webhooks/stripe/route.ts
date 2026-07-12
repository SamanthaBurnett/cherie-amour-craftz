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
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object;

        if (checkoutSession.payment_status === "paid") {
          await fulfillPaidOrder(checkoutSession);
        }

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const checkoutSession = event.data.object;

        await fulfillPaidOrder(checkoutSession);

        break;
      }

      case "checkout.session.async_payment_failed":

      case "checkout.session.expired": {
        const checkoutSession = event.data.object;

        await markOrderFailed(checkoutSession);

        break;
      }

      default:
        break;
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

function getOrderId(checkoutSession: Stripe.Checkout.Session): string | null {
  return (
    checkoutSession.metadata?.orderId ??
    checkoutSession.client_reference_id ??
    null
  );
}

function getPaymentIntentId(
  checkoutSession: Stripe.Checkout.Session,
): string | null {
  if (typeof checkoutSession.payment_intent === "string") {
    return checkoutSession.payment_intent;
  }

  return checkoutSession.payment_intent?.id ?? null;
}

async function fulfillPaidOrder(checkoutSession: Stripe.Checkout.Session) {
  const orderId = getOrderId(checkoutSession);

  if (!orderId) {
    throw new Error(
      `Stripe session ${checkoutSession.id} is missing an order ID.`,
    );
  }

  const paymentIntentId = getPaymentIntentId(checkoutSession);

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

    /*

     * Atomically claim this order for fulfillment.

     *

     * If two copies of the webhook arrive together, only one transaction

     * can change a non-PAID order to PAID. The other receives count = 0

     * and exits before touching inventory.

     */

    const claimedOrder = await transaction.order.updateMany({
      where: {
        id: order.id,

        paymentStatus: {
          not: PaymentStatus.PAID,
        },
      },

      data: {
        paymentStatus: PaymentStatus.PAID,

        stripeCheckoutSessionId: checkoutSession.id,

        stripePaymentIntentId: paymentIntentId,

        paidAt: new Date(),
      },
    });

    if (claimedOrder.count === 0) {
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
  });
}

async function markOrderFailed(checkoutSession: Stripe.Checkout.Session) {
  const orderId = getOrderId(checkoutSession);

  if (!orderId) {
    console.error(
      `Stripe session ${checkoutSession.id} is missing an order ID.`,
    );

    return;
  }

  await prisma.order.updateMany({
    where: {
      id: orderId,

      paymentStatus: {
        not: PaymentStatus.PAID,
      },
    },

    data: {
      paymentStatus: PaymentStatus.FAILED,

      stripeCheckoutSessionId: checkoutSession.id,
    },
  });
}
