import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { calculateInventoryStatus } from "@/lib/inventory";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      price,
      category,
      status,
      isCustom,
      thumbnailUrl,
      quantityOnHand,
      lowStockThreshold,
      sku,
    } = body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        status,
        isCustom,
        thumbnailUrl: thumbnailUrl?.trim() ? thumbnailUrl?.trim() : null,
        inventoryItem: {
          create: {
            sku: sku?.trim() ? sku?.trim() : null,
            quantityOnHand: Number(quantityOnHand),
            lowStockThreshold: Number(lowStockThreshold),
            status: calculateInventoryStatus(
              Number(quantityOnHand),

              Number(lowStockThreshold),
            ),
            adjustments: {
              create: {
                changeAmount: Number(quantityOnHand),
                reason: "INITIAL_STOCK",
                note: "Initial product inventory.",
              },
            },
          },
        },
      },
      include: {
        inventoryItem: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product", error);

    return NextResponse.json(
      { error: "Failed to create product" },

      { status: 500 },
    );
  }
}
