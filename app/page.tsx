import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

type StoreProfile = {
  businessName: string;
  tagline: string | null;
};

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  isCustom: boolean;
  inventoryItem?: {
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  } | null;
  thumbnailUrl: string | null;
};

async function getStoreProfile(): Promise<StoreProfile | null> {
  const response = await fetch("http://localhost:3000/api/store", {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

function getProductBadge(product: Product) {
  if (product.isCustom) {
    return "custom";
  }

  if (product.inventoryItem?.status === "LOW_STOCK") {
    return "low-stock";
  }

  if (product.inventoryItem?.status === "OUT_OF_STOCK") {
    return "sold-out";
  }

  return "new";
}

export default async function Home() {
  const [storeProfile, products] = await Promise.all([
    getStoreProfile(),

    getProducts(),
  ]);

  const featuredProducts = products.slice(0, 3);

  return (
    <PageContainer>
      <section className="grid gap-8 rounded-card border border-border bg-surface p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div>
          <p className="font-accent text-2xl text-coral">Handmade with Love</p>

          <h1 className="mt-4 text-4xl font-bold text-text md:text-6xl">
            {storeProfile?.businessName ?? "Cherie Amour Craftz"}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-text-muted">
            {storeProfile?.tagline ??
              "Custom crochet pieces made with love, made to fit you."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop">
              <Button>Shop Pieces</Button>
            </Link>

            <Link href="/custom-order">
              <Button variant="secondary">Start a Custom Order</Button>
            </Link>
          </div>
        </div>

        <Card className="flex min-h-72 items-center justify-center bg-white">
          <p className="text-center text-text-muted">Hero image placeholder</p>
        </Card>
      </section>

      <section className="mt-16">
        <SectionHeader
          eyebrow="Featured Pieces"
          title="Soft colors, custom details, handmade charm."
          description="A preview of ready-made and custom crochet pieces."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={`$${product.price}`}
              description={product.description}
              imageUrl={product.thumbnailUrl}
              badge={getProductBadge(product)}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
