import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventory = await prisma.inventoryItem.findMany({
      orderBy: {
        createdAt: "desc",
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

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Failed to fetch inventory", error);

    return NextResponse.json(
      { error: "Failed to fetch inventory" },

      { status: 500 },
    );
  }
}
