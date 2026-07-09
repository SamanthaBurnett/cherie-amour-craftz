import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        inventoryItem: true,

        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch admin products", error);

    return NextResponse.json(
      { error: "Failed to fetch admin products" },

      { status: 500 },
    );
  }
}
