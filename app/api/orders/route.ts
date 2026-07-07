import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type OrderItemInput = {
  productId: string;
  quantity: number;
};

type CreateOrderRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  shipping?: number;
  tax?: number;
  items: OrderItemInput[];
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderRequest;

    const {
      firstName,
      lastName,
      email,
      phone,
      items,
      shipping = 0,
      tax = 0,
    } = body;

    const customer = await prisma.customer.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        phone,
      },
      create: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { error: "No valid products found for order" },
        { status: 400 },
      );
    }

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const unitPrice = product.price;
      const lineTotal = product.price.mul(item.quantity);

      return {
        productId: product.id,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const subtotal = orderItems.reduce(
      (sum, item) => sum.add(item.lineTotal),
      products[0].price.mul(0),
    );

    const total = subtotal.add(shipping).add(tax);

    for (const item of orderItems) {
      const inventoryItem = await prisma.inventoryItem.findUnique({
        where: { productId: item.productId },
      });

      if (!inventoryItem) {
        throw new Error(`Inventory not found for product: ${item.productId}`);
      }

      if (inventoryItem.quantityOnHand < item.quantity) {
        return NextResponse.json(
          { error: `Not enough inventory for product: ${item.productId}` },

          { status: 400 },
        );
      }
    }

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        subtotal,
        shipping,
        tax,
        total,
        items: {
          create: orderItems,
        },
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

    for (const item of orderItems) {
      await prisma.inventoryItem.update({
        where: { productId: item.productId },

        data: {
          quantityOnHand: {
            decrement: item.quantity,
          },

          adjustments: {
            create: {
              changeAmount: -item.quantity,

              reason: "ORDER_PLACED",

              note: `Order placed: ${order.id}`,
            },
          },
        },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Failed to create order", error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
