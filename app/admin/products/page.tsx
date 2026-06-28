import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const products = [
  { name: "Golden Hour Crochet Bag", status: "Active", price: "$65" },
  { name: "Blush Market Tote", status: "Low Stock", price: "$58" },
  { name: "Custom Crochet Top", status: "Custom", price: "From $85" },
];

export default function AdminProductsPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Products"
        description="Create, edit, and organize ready-made pieces and custom listings."
      />

      <div className="mt-8 flex justify-end">
        <Button>Add Product</Button>
      </div>

      <div className="mt-6 grid gap-4">
        {products.map((product) => (
          <Card key={product.name}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{product.name}</p>

                <p className="text-sm text-text-muted">{product.status}</p>
              </div>

              <p className="font-semibold">{product.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
