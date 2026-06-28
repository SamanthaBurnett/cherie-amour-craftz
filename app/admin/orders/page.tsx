import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const orders = [
  { id: "CAC-1001", customer: "Maya J.", status: "Working", total: "$85" },
  { id: "CAC-1002", customer: "Tiana R.", status: "Pending", total: "$65" },
  { id: "CAC-1003", customer: "Leah M.", status: "Ready", total: "$120" },
];

export default function AdminOrdersPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Orders"
        description="View and manage ready-made and custom crochet orders."
      />

      <div className="mt-10 grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{order.id}</p>

                <p className="text-sm text-text-muted">{order.customer}</p>
              </div>

              <div className="text-right">
                <Badge variant="custom">{order.status}</Badge>

                <p className="mt-2 font-semibold">{order.total}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
