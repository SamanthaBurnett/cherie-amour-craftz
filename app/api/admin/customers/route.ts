import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        orders: true,

        customRequests: true,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers", error);

    return NextResponse.json(
      { error: "Failed to fetch customers" },

      { status: 500 },
    );
  }
}
