"use client";

import { useEffect, useState } from "react";

type Adjustment = {
  id: string;
  changeAmount: number;
  reason: string;
  note: string | null;
  createdAt: string;
};

type Props = {
  inventoryItemId: string;
};

export function InventoryHistory({ inventoryItemId }: Props) {
  const [history, setHistory] = useState<Adjustment[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const response = await fetch(
        `/api/admin/inventory/${inventoryItemId}/history`,
      );

      if (!response.ok) return;

      setHistory(await response.json());
    }

    loadHistory();
  }, [inventoryItemId]);

  return (
    <div className="mt-6">
      <p className="font-semibold">Recent Adjustments</p>

      <div className="mt-3 space-y-2">
        {history.map((adjustment) => (
          <div
            key={adjustment.id}
            className="rounded-xl border border-border p-3 text-sm"
          >
            <p>
              <strong>
                {adjustment.changeAmount > 0 ? "+" : ""}

                {adjustment.changeAmount}
              </strong>{" "}
              • {adjustment.reason}
            </p>

            {adjustment.note && (
              <p className="mt-1 text-text-muted">{adjustment.note}</p>
            )}

            <p className="mt-1 text-xs text-text-muted">
              {new Date(adjustment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

        {history.length === 0 && (
          <p className="text-sm text-text-muted">
            No inventory adjustments yet.
          </p>
        )}
      </div>
    </div>
  );
}
