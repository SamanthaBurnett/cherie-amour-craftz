import { prisma } from "@/lib/prisma";
import { InventoryAdjustmentReason } from "@/lib/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";
import { calculateInventoryStatus } from "@/lib/inventory";

type RouteParams = {
  params: Promise<{
    inventoryItemId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { inventoryItemId } = await params;

    const body = await request.json();

    const changeAmount = Number(body.changeAmount ?? 0);

    const reason = body.reason as InventoryAdjustmentReason;

    const note = String(body.note ?? "");

    if (!changeAmount || Number.isNaN(changeAmount)) {
      return NextResponse.json(
        { error: "Change amount is required." },

        { status: 400 },
      );
    }

    if (!Object.values(InventoryAdjustmentReason).includes(reason)) {
      return NextResponse.json(
        { error: "Invalid adjustment reason." },

        { status: 400 },
      );
    }

    const currentInventory = await prisma.inventoryItem.findUnique({
      where: {
        id: inventoryItemId,
      },
    });

    if (!currentInventory) {
      return NextResponse.json(
        { error: "Inventory item not found." },

        { status: 404 },
      );
    }

    const nextQuantity = currentInventory.quantityOnHand + changeAmount;

    if (nextQuantity < 0) {
      return NextResponse.json(
        { error: "Inventory quantity cannot go below zero." },

        { status: 400 },
      );
    }

    const nextStatus = calculateInventoryStatus(
      nextQuantity,

      currentInventory.lowStockThreshold,
    );

    const updatedInventory = await prisma.inventoryItem.update({
      where: {
        id: inventoryItemId,
      },

      data: {
        quantityOnHand: nextQuantity,

        status: nextStatus,

        adjustments: {
          create: {
            changeAmount,

            reason,

            note,
          },
        },
      },

      include: {
        product: true,

        adjustments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(updatedInventory);
  } catch (error) {
    console.error("Failed to adjust inventory", error);

    return NextResponse.json(
      { error: "Failed to adjust inventory." },

      { status: 500 },
    );
  }
}
