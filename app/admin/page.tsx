import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AdminDashboardPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Store dashboard"
        description="A future command center for orders, inventory, products, and custom requests."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-sm text-text-muted">Open Orders</p>

          <p className="mt-2 text-3xl font-bold">12</p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Custom Requests</p>

          <p className="mt-2 text-3xl font-bold">5</p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Low Stock</p>

          <p className="mt-2 text-3xl font-bold">3</p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Revenue</p>

          <p className="mt-2 text-3xl font-bold">$840</p>
        </Card>
      </div>
    </PageContainer>
  );
}
