import { ShopCatalog } from "@/components/ShopCatalog";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: "BAG" | "TOP" | "DRESS" | "SET" | "CUSTOM";
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

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Shop"
        title="Ready-made crochet pieces"
        description="Browse handmade pieces available for purchase."
      />

      <ShopCatalog products={products} />
    </PageContainer>
  );
}
