import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InventoryAdjustmentForm } from "@/components/admin/InventoryAdjustmentForm";
import { InventoryHistory } from "@/components/admin/InventoryHistory";

type InventoryItem = {
  id: string;
  sku: string | null;
  quantityOnHand: number;
  lowStockThreshold: number;
  status: string;
  product: {
    title: string;
  };
};

async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch("http://localhost:3000/api/inventory", {
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

export default async function AdminInventoryPage() {
  const inventory = await getInventory();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Inventory"
        description="Track finished pieces and adjust stock levels."
      />

      <div className="mt-10 grid gap-4">
        {inventory.map((item) => (
          <Card key={item.id}>
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <p className="font-semibold">{item.product.title}</p>

                {item.sku && (
                  <p className="mt-1 text-sm text-text-muted">
                    SKU: {item.sku}
                  </p>
                )}

                <p className="mt-2 text-sm text-text-muted">
                  Threshold: {item.lowStockThreshold}
                </p>

                <div className="mt-4">
                  <Badge variant="custom">{formatLabel(item.status)}</Badge>
                </div>
              </div>

              <div className="md:text-right">
                <p className="text-2xl font-bold">{item.quantityOnHand}</p>

                <p className="text-sm text-text-muted">on hand</p>
              </div>
            </div>

            <InventoryAdjustmentForm inventoryItemId={item.id} />
            <InventoryHistory inventoryItemId={item.id} />
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
