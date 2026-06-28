import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

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

  console.log(`Seeded store profile: ${storeProfile.businessName}`);
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
