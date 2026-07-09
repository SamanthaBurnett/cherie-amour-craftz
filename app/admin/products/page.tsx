import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Product = {
  id: string;

  title: string;

  description: string;

  price: string;

  category: string;

  status: string;

  isCustom: boolean;

  inventoryItem: {
    quantityOnHand: number;

    status: string;
  } | null;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/admin/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

function formatLabel(value: string) {
  return value

    .toLowerCase()

    .split("_")

    .map((word) => word[0].toUpperCase() + word.slice(1))

    .join(" ");
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Products"
        description="View products, pricing, categories, and inventory status."
      />

      <div className="mt-6">
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{product.title}</p>

                <p className="mt-1 text-sm text-text-muted">
                  {product.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="custom">
                    {formatLabel(product.category)}
                  </Badge>

                  <Badge variant="custom">{formatLabel(product.status)}</Badge>

                  {product.isCustom && <Badge variant="custom">Custom</Badge>}
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">${product.price}</p>

                <p className="mt-2 text-sm text-text-muted">
                  Qty: {product.inventoryItem?.quantityOnHand ?? 0}
                </p>

                <p className="text-sm text-text-muted">
                  {product.inventoryItem
                    ? formatLabel(product.inventoryItem.status)
                    : "No inventory"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
