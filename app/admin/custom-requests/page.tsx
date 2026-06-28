import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const requests = [
  {
    customer: "Maya J.",
    item: "Crochet vacation set",
    status: "Pending Review",
  },

  {
    customer: "Tiana R.",
    item: "Custom beach bag",
    status: "Accepted",
  },
];

export default function AdminCustomRequestsPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Custom Requests"
        description="Review inspiration, measurements, deadlines, and customer notes."
      />

      <div className="mt-10 grid gap-4">
        {requests.map((request) => (
          <Card key={`${request.customer}-${request.item}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{request.item}</p>

                <p className="text-sm text-text-muted">{request.customer}</p>
              </div>

              <div className="text-right">
                <Badge variant="custom">{request.status}</Badge>

                <Button variant="ghost" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
