"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type InventoryAdjustmentFormProps = {
  inventoryItemId: string;
};

export function InventoryAdjustmentForm({
  inventoryItemId,
}: InventoryAdjustmentFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    setIsSubmitting(true);

    const payload = {
      changeAmount: Number(formData.get("changeAmount") ?? 0),

      reason: String(formData.get("reason") ?? "CORRECTION"),

      note: String(formData.get("note") ?? ""),
    };

    try {
      const response = await fetch(
        `/api/admin/inventory/${inventoryItemId}/adjust`,

        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        console.error("Failed to adjust inventory");

        return;
      }

      form.reset();

      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          label="Change Amount"
          name="changeAmount"
          type="number"
          placeholder="Example: 5 or -2"
        />

        <label className="block">
          <span className="text-sm font-medium text-text">Reason</span>

          <select
            name="reason"
            defaultValue="CORRECTION"
            className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
          >
            <option value="RESTOCK">Restock</option>

            <option value="CORRECTION">Correction</option>

            <option value="DAMAGED">Damaged</option>

            <option value="RETURNED">Returned</option>
          </select>
        </label>
      </div>

      <Textarea
        label="Note"
        name="note"
        placeholder="Optional note about this adjustment."
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Adjust Stock"}
      </Button>
    </form>
  );
}
