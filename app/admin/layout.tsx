import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

function getAdminEmails() {
  return (
    process.env.ADMIN_EMAILS?.split(",").map((email) =>
      email.trim().toLowerCase(),
    ) ?? []
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const adminEmails = getAdminEmails();

  const userEmail = session.user.email.toLowerCase();

  if (!adminEmails.includes(userEmail)) {
    redirect("/");
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[16rem_1fr]">
      <AdminNav />

      <main>{children}</main>
    </div>
  );
}
