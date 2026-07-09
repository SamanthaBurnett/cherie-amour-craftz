import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    productId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { productId } = await params;

    const body = await request.json();

    const {
      title,
      description,
      price,
      category,
      status,
      isCustom,
      thumbnailUrl,
    } = body;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        title,
        description,
        price,
        category,
        status,
        isCustom,
        thumbnailUrl: thumbnailUrl?.trim() ? thumbnailUrl.trim() : null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product", error);

    return NextResponse.json(
      { error: "Failed to update product" },

      { status: 500 },
    );
  }
}
