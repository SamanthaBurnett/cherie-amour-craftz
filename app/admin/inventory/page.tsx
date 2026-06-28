import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const inventory = [
  { item: "Golden Hour Crochet Bag", quantity: 4, threshold: 2 },
  { item: "Blush Market Tote", quantity: 1, threshold: 2 },
  { item: "Peach Cotton Yarn", quantity: 8, threshold: 5 },
];

export default function AdminInventoryPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Inventory"
        description="Track finished pieces and eventually materials like yarn, buttons, and handles."
      />

      <div className="mt-8 flex justify-end">
        <Button>Add Inventory Item</Button>
      </div>

      <div className="mt-6 grid gap-4">
        {inventory.map((item) => {
          const isLowStock = item.quantity <= item.threshold;

          return (
            <Card key={item.item}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.item}</p>

                  <p className="text-sm text-text-muted">
                    Threshold: {item.threshold}
                  </p>
                </div>

                <div className="text-right">
                  <Badge variant={isLowStock ? "low-stock" : "new"}>
                    {isLowStock ? "Low Stock" : "In Stock"}
                  </Badge>

                  <p className="mt-2 font-semibold">Qty: {item.quantity}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
