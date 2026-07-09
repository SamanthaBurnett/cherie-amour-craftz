"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/Textarea";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  status: string;
  isCustom: boolean;
  thumbnailUrl: string | null;
};

export default function EditProductPage() {
  const router = useRouter();

  const params = useParams<{ productId: string }>();

  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        setErrorMessage("Product could not be loaded.");

        return;
      }

      const data = await response.json();

      setProduct(data);
    }

    loadProduct();
  }, [productId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

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
    };

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Product could not be updated.");
      }

      router.push("/admin/products");

      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while updating the product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!product) {
    return (
      <PageContainer>
        <p className="text-text-muted">
          {errorMessage || "Loading product..."}
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Admin"
        title="Edit Product"
        description="Update product details, pricing, and storefront status."
      />

      <Card className="mt-10">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <Input label="Title" name="title" defaultValue={product.title} />

          <Textarea
            label="Description"
            name="description"
            defaultValue={product.description}
          />

          <Input
            label="Price"
            name="price"
            type="number"
            defaultValue={product.price}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-text">Category</span>

              <select
                name="category"
                defaultValue={product.category}
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
                defaultValue={product.status}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
              >
                <option value="DRAFT">Draft</option>

                <option value="ACTIVE">Active</option>

                <option value="ARCHIVED">Archived</option>

                <option value="SOLD_OUT">Sold Out</option>
              </select>
            </label>
          </div>

          <Input
            label="Thumbnail URL"
            name="thumbnailUrl"
            defaultValue={product.thumbnailUrl ?? ""}
          />

          <label className="flex items-center gap-3 text-sm text-text">
            <input
              name="isCustom"
              type="checkbox"
              defaultChecked={product.isCustom}
            />
            This is a custom/made-to-order product
          </label>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-error">
              {errorMessage}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
