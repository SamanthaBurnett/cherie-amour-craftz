import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@/lib/generated/prisma/enums";

type RouteParams = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { orderId } = await params;

    const body = await request.json();

    const status = body.status as OrderStatus;

    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid order status" },
        { status: 400 },
      );
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order", error);

    return NextResponse.json(
      { error: "Failed to update order" },

      { status: 500 },
    );
  }
}
