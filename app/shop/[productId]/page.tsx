import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  isCustom: boolean;
  thumbnailUrl: string | null;
  images: {
    id: string;
    imageUrl: string;
    altText: string | null;
    displayOrder: number;
  }[];
  inventoryItem?: {
    quantityOnHand: number;
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  } | null;
};

async function getProduct(productId: string): Promise<Product | null> {
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

function getAvailabilityText(product: Product) {
  if (product.isCustom) {
    return "Made to order";
  }

  if (!product.inventoryItem) {
    return "Availability not listed";
  }

  if (product.inventoryItem.status === "OUT_OF_STOCK") {
    return "Out of stock";
  }

  if (product.inventoryItem.status === "LOW_STOCK") {
    return `Low stock: ${product.inventoryItem.quantityOnHand} left`;
  }

  return `In stock: ${product.inventoryItem.quantityOnHand} available`;
}

function getBadge(product: Product) {
  if (product.isCustom) return "custom";

  if (product.inventoryItem?.status === "LOW_STOCK") return "low-stock";

  if (product.inventoryItem?.status === "OUT_OF_STOCK") return "sold-out";

  return "new";
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const primaryImage =
    product.images[0]?.imageUrl ??
    product.thumbnailUrl ??
    "/placeholder-product.png";

  return (
    <PageContainer>
      <Link href="/shop" className="text-sm font-medium text-coral">
        ← Back to Shop
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex min-h-105 items-center justify-center rounded-card border border-border bg-surface">
            <p className="text-text-muted">{primaryImage}</p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <div
                key={image.id}
                className="flex h-24 items-center justify-center rounded-2xl border border-border bg-white p-2 text-center text-xs text-text-muted"
              >
                {image.altText ?? "Product image"}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <Badge variant={getBadge(product)}>
            {getBadge(product).replace("-", " ")}
          </Badge>

          <h1 className="mt-4 text-4xl font-bold">{product.title}</h1>

          <p className="mt-4 text-2xl font-semibold">${product.price}</p>

          <p className="mt-4 text-sm uppercase tracking-wide text-text-muted">
            {product.category}
          </p>

          <p className="mt-6 text-text-muted">{product.description}</p>

          <div className="mt-6 rounded-2xl bg-surface p-4">
            <p className="text-sm font-semibold text-text">Availability</p>

            <p className="mt-1 text-text-muted">
              {getAvailabilityText(product)}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton
              productId={product.id}
              title={product.title}
              price={product.price}
              imageUrl={primaryImage}
              disabled={product.inventoryItem?.status === "OUT_OF_STOCK"}
            />
            <Link href="/custom-order">
              <Button variant="secondary">Ask About Custom</Button>
            </Link>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
