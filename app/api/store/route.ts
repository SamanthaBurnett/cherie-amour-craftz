import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const storeProfile = await prisma.storeProfile.findFirst();

    if (!storeProfile) {
      return NextResponse.json(
        { error: "Store profile not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(storeProfile);
  } catch (error) {
    console.error("Failed to fetch store profile.", error);

    return NextResponse.json(
      { error: "Failed to fetch store profile." },
      { status: 500 },
    );
  }
}
