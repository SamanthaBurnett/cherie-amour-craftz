import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    inventoryItemId: string;
  }>;
};

export async function GET(
  request: Request,

  { params }: RouteParams,
) {
  const { inventoryItemId } = await params;

  const adjustments = await prisma.inventoryAdjustment.findMany({
    where: {
      inventoryItemId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(adjustments);
}
