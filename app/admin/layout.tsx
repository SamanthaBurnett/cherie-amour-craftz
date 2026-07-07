import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

  return <>{children}</>;
}
