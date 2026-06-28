"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: "BAG" | "TOP" | "DRESS" | "SET" | "CUSTOM";
  isCustom: boolean;
  inventoryItem?: {
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  } | null;
};

type ShopCatalogProps = {
  products: Product[];
};

function getProductBadge(product: Product) {
  if (product.isCustom) return "custom";

  if (product.inventoryItem?.status === "LOW_STOCK") return "low-stock";

  if (product.inventoryItem?.status === "OUT_OF_STOCK") return "sold-out";

  return "new";
}

export function ShopCatalog({ products }: ShopCatalogProps) {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [sort, setSort] = useState("NEWEST");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "ALL" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "PRICE_LOW_HIGH") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "PRICE_HIGH_LOW") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <>
      <div className="mt-10 grid gap-4 rounded-card border border-border bg-white p-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-text">Search</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search pieces"
            className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition placeholder:text-text-muted focus:border-coral"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">Category</span>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
          >
            <option value="ALL">All</option>

            <option value="BAG">Bags</option>

            <option value="TOP">Tops</option>

            <option value="DRESS">Dresses</option>

            <option value="SET">Sets</option>

            <option value="CUSTOM">Custom</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">Sort</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-coral"
          >
            <option value="NEWEST">Newest</option>

            <option value="PRICE_LOW_HIGH">Price: Low to High</option>

            <option value="PRICE_HIGH_LOW">Price: High to Low</option>
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={`$${product.price}`}
            description={product.description}
            badge={getProductBadge(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-text-muted">
          No pieces matched your search.
        </p>
      )}
    </>
  );
}
