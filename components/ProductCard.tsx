import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ProductCardProps = {
  id?: string;
  name: string;
  price: string;
  description: string;
  badge?: "new" | "custom" | "sold-out" | "low-stock";
};

export function ProductCard({
  id,
  name,
  price,
  description,
  badge = "new",
}: ProductCardProps) {
  const content = (
    <Card className="overflow-hidden p-0">
      <div className="h-56 bg-surface" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Badge variant={badge}>{badge.replace("-", " ")}</Badge>

          <p className="font-semibold text-text">{price}</p>
        </div>

        <h3 className="text-xl font-semibold text-text">{name}</h3>

        <p className="mt-2 text-sm text-text-muted">{description}</p>

        <Button className="mt-6 w-full">View Details</Button>
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
