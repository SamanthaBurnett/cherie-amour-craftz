import { CustomerSearch } from "@/components/admin/CustomerSearch";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  createdAt: string;
  orders: { id: string }[];
  customRequests: { id: string }[];
};

async function getCustomers(): Promise<Customer[]> {
  const response = await fetch("http://localhost:3000/api/admin/customers", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Customers"
        description="Search customers and review their order/custom request activity."
      />

      <CustomerSearch customers={customers} />
    </PageContainer>
  );
}
