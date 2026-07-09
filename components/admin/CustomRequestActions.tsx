"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type CustomRequestActionsProps = {
  requestId: string;

  status: string;
};

export function CustomRequestActions({
  requestId,

  status,
}: CustomRequestActionsProps) {
  const router = useRouter();

  const isFinalStatus = status === "ACCEPTED" || status === "DECLINED";

  if (isFinalStatus) {
    return null;
  }

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
