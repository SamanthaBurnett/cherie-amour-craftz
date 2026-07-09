import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

type DashboardMetrics = {
  totalProducts: number;

  openOrders: number;

  pendingCustomRequests: number;

  lowInventoryItems: number;
};

async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await fetch("http://localhost:3000/api/admin/dashboard", {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      totalProducts: 0,

      openOrders: 0,

      pendingCustomRequests: 0,

      lowInventoryItems: 0,
    };
  }

  return response.json();
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Store dashboard"
        description="A quick snapshot of products, orders, custom requests, and inventory."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-sm text-text-muted">Products</p>

          <p className="mt-2 text-3xl font-bold">{metrics.totalProducts}</p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Open Orders</p>

          <p className="mt-2 text-3xl font-bold">{metrics.openOrders}</p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Pending Custom Requests</p>

          <p className="mt-2 text-3xl font-bold">
            {metrics.pendingCustomRequests}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-text-muted">Low Inventory</p>

          <p className="mt-2 text-3xl font-bold">{metrics.lowInventoryItems}</p>
        </Card>
      </div>
    </PageContainer>
  );
}
