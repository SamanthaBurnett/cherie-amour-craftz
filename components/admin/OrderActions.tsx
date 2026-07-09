"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type OrderActionsProps = {
  orderId: string;
};

export function OrderActions({ orderId }: OrderActionsProps) {
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(status: string) {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        console.error("Failed to update order status");

        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to update order status", error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap justify-end gap-2">
      <Button
        variant="secondary"
        disabled={isUpdating}
        onClick={() => updateStatus("IN_PROGRESS")}
      >
        Start
      </Button>

      <Button
        variant="secondary"
        disabled={isUpdating}
        onClick={() => updateStatus("READY")}
      >
        Ready
      </Button>

      <Button disabled={isUpdating} onClick={() => updateStatus("DELIVERED")}>
        Complete
      </Button>
    </div>
  );
}
