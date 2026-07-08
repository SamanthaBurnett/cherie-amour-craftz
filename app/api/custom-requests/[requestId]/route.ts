import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    requestId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { requestId } = await params;

    const body = await request.json();

    const { status } = body;

    const updatedRequest = await prisma.customRequest.update({
      where: {
        id: requestId,
      },

      data: {
        status,
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Failed to update custom request", error);

    return NextResponse.json(
      { error: "Failed to update custom request" },

      { status: 500 },
    );
  }
}
