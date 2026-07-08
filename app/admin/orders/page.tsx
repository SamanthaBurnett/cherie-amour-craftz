import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatOrderStatus } from "@/lib/orderStatus";

type Order = {
  id: string;
  status: string;
  total: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  items: {
    id: string;
    quantity: number;
    product: {
      title: string;
    };
  }[];
};

async function getOrders(): Promise<Order[]> {
  const response = await fetch("http://localhost:3000/api/admin/orders", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Orders"
        description="View and manage customer orders."
      />

      <div className="mt-10 grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{order.id}</p>

                <p className="mt-1 text-sm text-text-muted">
                  {order.customer.firstName} {order.customer.lastName}
                </p>

                <p className="text-sm text-text-muted">
                  {order.customer.email}
                </p>

                <div className="mt-4 grid gap-1 text-sm text-text-muted">
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.quantity} × {item.product.title}
                    </p>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <Badge variant="custom">
                  {formatOrderStatus(order.status)}
                </Badge>

                <p className="mt-3 font-semibold">${order.total}</p>

                <p className="mt-1 text-xs text-text-muted">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
