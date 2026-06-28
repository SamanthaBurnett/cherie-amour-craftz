import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      itemType,
      description,
      referenceImageUrl,
      deadline,
      measurements,
    } = body;

    const customer = await prisma.customer.upsert({
      where: { email },

      update: {
        firstName,
        lastName,
        phone,
      },

      create: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    const customRequest = await prisma.customRequest.create({
      data: {
        customerId: customer.id,
        itemType,
        description,
        referenceImageUrl,
        deadline: deadline ? new Date(deadline) : null,
        measurements: measurements
          ? {
              create: {
                bust: measurements.bust,
                waist: measurements.waist,
                hips: measurements.hips,
                length: measurements.length,
                shoulder: measurements.shoulder,
                inseam: measurements.inseam,
                notes: measurements.notes,
              },
            }
          : undefined,
      },

      include: {
        customer: true,
        measurements: true,
      },
    });

    return NextResponse.json(customRequest, { status: 201 });
  } catch (error) {
    console.error("Failed to create custom request", error);

    return NextResponse.json(
      { error: "Failed to create custom request" },

      { status: 500 },
    );
  }
}
