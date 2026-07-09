"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/Textarea";

export default function NewProductPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    setIsSubmitting(true);

    setErrorMessage("");

    const payload = {
      title: String(formData.get("title") ?? ""),

      description: String(formData.get("description") ?? ""),

      price: Number(formData.get("price") ?? 0),

      category: String(formData.get("category") ?? "BAG"),

      status: String(formData.get("status") ?? "DRAFT"),

      isCustom: formData.get("isCustom") === "on",

      thumbnailUrl: String(formData.get("thumbnailUrl") ?? ""),

      sku: String(formData.get("sku") ?? ""),

      quantityOnHand: Number(formData.get("quantityOnHand") ?? 0),

      lowStockThreshold: Number(formData.get("lowStockThreshold") ?? 1),
    };

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Product could not be created.");
      }

      router.push("/admin/products");

      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while creating the product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="New Product"
        description="Add a ready-made or custom crochet product."
      />

      <Card className="mt-10">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <Input label="Title" name="title" />

          <Textarea
            label="Description"
            name="description"
            placeholder="Describe the product, materials, colors, or style."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Price" name="price" type="number" />

            <Input label="SKU" name="sku" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-text">Category</span>

              <select
                name="category"
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
              >
                <option value="BAG">Bag</option>

                <option value="TOP">Top</option>

                <option value="DRESS">Dress</option>

                <option value="ACCESSORY">Accessory</option>

                <option value="CUSTOM">Custom</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-text">Status</span>

              <select
                name="status"
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
              >
                <option value="DRAFT">Draft</option>

                <option value="ACTIVE">Active</option>

                <option value="ARCHIVED">Archived</option>

                <option value="SOLD_OUT">Sold Out</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Quantity On Hand"
              name="quantityOnHand"
              type="number"
            />

            <Input
              label="Low Stock Threshold"
              name="lowStockThreshold"
              type="number"
            />
          </div>

          <Input
            label="Thumbnail URL"
            name="thumbnailUrl"
            placeholder="/placeholder-product.png"
          />

          <label className="flex items-center gap-3 text-sm text-text">
            <input name="isCustom" type="checkbox" />
            This is a custom/made-to-order product
          </label>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-error">
              {errorMessage}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
