"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type CustomRequestActionsProps = {
  requestId: string;
};

export function CustomRequestActions({ requestId }: CustomRequestActionsProps) {
  const router = useRouter();

  async function updateStatus(status: "ACCEPTED" | "DECLINED") {
    await fetch(`/api/admin/custom-requests/${requestId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  return (
    <div className="mt-4 flex gap-2">
      <Button onClick={() => updateStatus("ACCEPTED")}>Approve</Button>

      <Button variant="secondary" onClick={() => updateStatus("DECLINED")}>
        Decline
      </Button>
    </div>
  );
}
