"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type Props = {
  orderId: string;
};

export function OrderActions({ orderId }: Props) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => updateStatus("IN_PROGRESS")}>
        Start
      </Button>

      <Button variant="secondary" onClick={() => updateStatus("READY")}>
        Ready
      </Button>

      <Button onClick={() => updateStatus("COMPLETED")}>Complete</Button>
    </div>
  );
}
