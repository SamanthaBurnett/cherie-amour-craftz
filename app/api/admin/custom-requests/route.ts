import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customRequests = await prisma.customRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        customer: true,

        measurements: true,
      },
    });

    return NextResponse.json(customRequests);
  } catch (error) {
    console.error("Failed to fetch custom requests", error);

    return NextResponse.json(
      { error: "Failed to fetch custom requests" },

      { status: 500 },
    );
  }
}
