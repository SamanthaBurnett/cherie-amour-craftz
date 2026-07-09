import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      totalProducts,

      openOrders,

      pendingCustomRequests,

      lowInventoryItems,
    ] = await Promise.all([
      prisma.product.count(),

      prisma.order.count({
        where: {
          status: {
            in: ["PENDING", "CONFIRMED", "IN_PROGRESS", "READY"],
          },
        },
      }),

      prisma.customRequest.count({
        where: {
          status: "PENDING_REVIEW",
        },
      }),

      prisma.inventoryItem.count({
        where: {
          status: "LOW_STOCK",
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,

      openOrders,

      pendingCustomRequests,

      lowInventoryItems,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard metrics", error);

    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },

      { status: 500 },
    );
  }
}
