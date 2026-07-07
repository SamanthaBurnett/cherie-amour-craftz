import { auth } from "@/auth";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { redirect } from "next/navigation";

export default async function AdminProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Profile"
        description="View the Google account currently signed in."
      />

      <Card className="mt-10">
        <div className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-text-muted">Name</p>

            <p className="mt-1 font-semibold">
              {session.user.name ?? "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-text-muted">Email</p>

            <p className="mt-1 font-semibold">
              {session.user.email ?? "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-text-muted">Access</p>

            <p className="mt-1 font-semibold">Admin</p>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
