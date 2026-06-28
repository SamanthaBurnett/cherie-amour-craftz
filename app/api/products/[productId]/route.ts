import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { productId } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },

      include: {
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },

        inventoryItem: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product", error);

    return NextResponse.json(
      { error: "Failed to fetch product" },

      { status: 500 },
    );
  }
}
