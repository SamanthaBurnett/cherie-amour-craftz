import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  const storeProfile = await prisma.storeProfile.upsert({
    where: { id: "store_profile_cherie_amour" },

    update: {},

    create: {
      id: "store_profile_cherie_amour",
      businessName: "Cherie Amour Craftz",
      tagline: "Custom crochet pieces made with love, made to fit you.",
    },
  });

  const goldenHourBag = await prisma.product.upsert({
    where: { id: "product_golden_hour_bag" },

    update: {},

    create: {
      id: "product_golden_hour_bag",
      title: "Golden Hour Crochet Bag",
      description:
        "A lightweight beach-ready crochet bag with soft pastel details.",
      price: 65,
      category: "BAG",
      status: "ACTIVE",
      isCustom: false,
      thumbnailUrl: "/placeholder-product.png",
      images: {
        create: [
          {
            imageUrl: "/placeholder-product.png",
            altText: "Golden Hour Crochet Bag",
            displayOrder: 1,
          },
        ],
      },

      inventoryItem: {
        create: {
          sku: "CAC-BAG-001",
          quantityOnHand: 4,
          lowStockThreshold: 2,
          status: "IN_STOCK",
          adjustments: {
            create: [
              {
                changeAmount: 4,
                reason: "INITIAL_STOCK",
                note: "Initial seed inventory.",
              },
            ],
          },
        },
      },
    },
  });

  const blushTote = await prisma.product.upsert({
    where: { id: "product_blush_market_tote" },

    update: {},

    create: {
      id: "product_blush_market_tote",
      title: "Blush Market Tote",
      description: "A roomy handmade tote for everyday coastal living.",
      price: 58,
      category: "BAG",
      status: "ACTIVE",
      isCustom: false,
      thumbnailUrl: "/placeholder-product.png",
      images: {
        create: [
          {
            imageUrl: "/placeholder-product.png",
            altText: "Blush Market Tote",
            displayOrder: 1,
          },
        ],
      },

      inventoryItem: {
        create: {
          sku: "CAC-BAG-002",
          quantityOnHand: 1,
          lowStockThreshold: 2,
          status: "LOW_STOCK",

          adjustments: {
            create: [
              {
                changeAmount: 1,
                reason: "INITIAL_STOCK",
                note: "Initial seed inventory.",
              },
            ],
          },
        },
      },
    },
  });

  const customTop = await prisma.product.upsert({
    where: { id: "product_custom_crochet_top" },

    update: {},

    create: {
      id: "product_custom_crochet_top",
      title: "Custom Crochet Top",
      description:
        "A made-to-measure crochet top designed around your style and fit.",
      price: 85,
      category: "TOP",
      status: "ACTIVE",
      isCustom: true,
      thumbnailUrl: "/placeholder-product.png",
      images: {
        create: [
          {
            imageUrl: "/placeholder-product.png",
            altText: "Custom Crochet Top",
            displayOrder: 1,
          },
        ],
      },

      inventoryItem: {
        create: {
          sku: "CAC-TOP-001",
          quantityOnHand: 0,
          lowStockThreshold: 1,
          status: "OUT_OF_STOCK",
          adjustments: {
            create: [
              {
                changeAmount: 0,
                reason: "INITIAL_STOCK",
                note: "Custom item, inventory not stocked in advance.",
              },
            ],
          },
        },
      },
    },
  });

  console.log(`Seeded store profile: ${storeProfile.businessName}`);

  console.log(`Seeded product: ${goldenHourBag.title}`);

  console.log(`Seeded product: ${blushTote.title}`);

  console.log(`Seeded product: ${customTop.title}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
