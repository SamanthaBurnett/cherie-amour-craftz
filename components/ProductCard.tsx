import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ProductCardProps = {
  id?: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string | null;
  badge?: "new" | "custom" | "sold-out" | "low-stock";
  availability?: string;
};

export function ProductCard({
  id,
  name,
  price,
  description,
  imageUrl,
  badge = "new",
  availability,
}: ProductCardProps) {
  const isSoldOut = availability === "OUT_OF_STOCK";

  const isLowStock = availability === "LOW_STOCK";

  const content = (
    <Card className="overflow-hidden p-0">
      <div className="flex h-56 items-center justify-center bg-surface">
        {imageUrl ? (
          <p className="px-4 text-center text-sm text-text-muted">{imageUrl}</p>
        ) : (
          <p className="text-sm text-text-muted">Product image</p>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant={badge}>{badge.replace("-", " ")}</Badge>

            {isSoldOut && <Badge variant="sold-out">Sold Out</Badge>}

            {!isSoldOut && isLowStock && (
              <Badge variant="low-stock">Low Stock</Badge>
            )}
          </div>

          <p className="font-semibold text-text">{price}</p>
        </div>

        <h3 className="text-xl font-semibold text-text">{name}</h3>

        <p className="mt-2 text-sm text-text-muted">{description}</p>

        <Button className="mt-6 w-full">
          {isSoldOut ? "View Details" : "View Details"}
        </Button>
      </div>
    </Card>
  );

  if (!id) {
    return content;
  }

  return (
    <Link href={`/shop/${id}`} className="block">
      {content}
    </Link>
  );
}
