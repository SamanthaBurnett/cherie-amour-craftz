import { ProductCard } from "@/components/ProductCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  isCustom: boolean;
  inventoryItem?: {
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  } | null;
};

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

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Shop"
        title="Ready-made crochet pieces"
        description="Browse handmade pieces available for purchase."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={`$${product.price}`}
            description={product.description}
            badge={getProductBadge(product)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
