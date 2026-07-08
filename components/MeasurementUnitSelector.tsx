"use client";

import { useState } from "react";

export function MeasurementUnitSelector() {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  return (
    <div>
      <p className="text-sm font-medium text-text">Measurement Unit</p>

      <div className="mt-2 inline-flex rounded-button border border-border bg-white p-1">
        <button
          type="button"
          onClick={() => setUnit("in")}
          className={`rounded-button px-4 py-2 text-sm font-medium transition ${
            unit === "in"
              ? "bg-coral text-white"
              : "text-text-muted hover:text-text"
          }`}
        >
          Inches
        </button>

        <button
          type="button"
          onClick={() => setUnit("cm")}
          className={`rounded-button px-4 py-2 text-sm font-medium transition ${
            unit === "cm"
              ? "bg-coral text-white"
              : "text-text-muted hover:text-text"
          }`}
        >
          Centimeters
        </button>
      </div>

      <input type="hidden" name="measurementUnit" value={unit} />
    </div>
  );
}
