import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function PATCH(
  request: NextRequest,

  { params }: RouteParams,
) {
  try {
    const { orderId } = await params;

    const { status } = await request.json();

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
