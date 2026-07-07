"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    return (
      <Button variant="secondary" onClick={() => signIn("google")}>
        Sign in
      </Button>
    );
  }

  return (
    <Button variant="secondary" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
