import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CustomRequestActions } from "@/components/admin/CustomRequestActions";

type CustomRequest = {
  id: string;

  status: string;

  itemType: string;

  description: string;

  deadline: string | null;

  createdAt: string;

  customer: {
    firstName: string;

    lastName: string;

    email: string;

    phone: string | null;
  };

  measurements: {
    bust: string | null;

    waist: string | null;

    hips: string | null;

    length: string | null;

    shoulder: string | null;

    inseam: string | null;

    notes: string | null;
  } | null;
};

async function getCustomRequests(): Promise<CustomRequest[]> {
  const response = await fetch(
    "http://localhost:3000/api/admin/custom-requests",

    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
}

function formatStatus(status: string) {
  return status

    .toLowerCase()

    .split("_")

    .map((word) => word[0].toUpperCase() + word.slice(1))

    .join(" ");
}

export default async function AdminCustomRequestsPage() {
  const customRequests = await getCustomRequests();

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Custom Requests"
        description="Review customer requests, inspiration, measurements, and notes."
      />

      <div className="mt-10 grid gap-4">
        {customRequests.map((request) => (
          <Card key={request.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{request.itemType}</p>

                <p className="mt-1 text-sm text-text-muted">
                  {request.customer.firstName} {request.customer.lastName}
                </p>

                <p className="text-sm text-text-muted">
                  {request.customer.email}
                </p>

                {request.customer.phone && (
                  <p className="text-sm text-text-muted">
                    {request.customer.phone}
                  </p>
                )}

                <p className="mt-4 max-w-3xl text-sm text-text-muted">
                  {request.description}
                </p>

                {request.deadline && (
                  <p className="mt-3 text-sm text-text-muted">
                    Deadline: {new Date(request.deadline).toLocaleDateString()}
                  </p>
                )}

                {request.measurements && (
                  <div className="mt-4 rounded-2xl bg-surface p-4 text-sm text-text-muted">
                    <p className="mb-2 font-semibold text-text">Measurements</p>

                    <div className="grid gap-1 md:grid-cols-2">
                      {request.measurements.bust && (
                        <p>Bust: {request.measurements.bust}</p>
                      )}

                      {request.measurements.waist && (
                        <p>Waist: {request.measurements.waist}</p>
                      )}

                      {request.measurements.hips && (
                        <p>Hips: {request.measurements.hips}</p>
                      )}

                      {request.measurements.length && (
                        <p>Length: {request.measurements.length}</p>
                      )}

                      {request.measurements.shoulder && (
                        <p>Shoulder: {request.measurements.shoulder}</p>
                      )}

                      {request.measurements.inseam && (
                        <p>Inseam: {request.measurements.inseam}</p>
                      )}
                    </div>

                    {request.measurements.notes && (
                      <p className="mt-3 whitespace-pre-line">
                        {request.measurements.notes}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="text-right">
                <Badge variant="custom">{formatStatus(request.status)}</Badge>

                <p className="mt-3 text-xs text-text-muted">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>

                <CustomRequestActions requestId={request.id} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
