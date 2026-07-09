import { prisma } from "@/lib/prisma";
import { CustomRequestStatus } from "@/lib/generated/prisma/enums";
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

    const status = body.status as CustomRequestStatus;

    if (!Object.values(CustomRequestStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid custom request status" },

        { status: 400 },
      );
    }

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
