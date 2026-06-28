import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const customers = [
  { name: "Maya J.", email: "maya@example.com", orders: 2 },
  { name: "Tiana R.", email: "tiana@example.com", orders: 1 },
  { name: "Leah M.", email: "leah@example.com", orders: 3 },
];

export default function AdminCustomersPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Customers"
        description="View customer profiles, saved measurements, and order history."
      />

      <div className="mt-10 grid gap-4">
        {customers.map((customer) => (
          <Card key={customer.email}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{customer.name}</p>

                <p className="text-sm text-text-muted">{customer.email}</p>
              </div>

              <p className="text-sm text-text-muted">
                {customer.orders} orders
              </p>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
