"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          title="Your bag is empty"
          description="Start shopping or request a custom piece made just for you."
          actionLabel="Shop Pieces"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Your Bag"
        title="Review your pieces"
        description="Confirm your selections before checkout."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.productId}>
              <div className="flex gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-surface text-xs text-text-muted">
                  Image
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>

                  <p className="mt-1 text-sm text-text-muted">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.productId)}
                      className="rounded-full border border-border px-3 py-1"
                    >
                      -
                    </button>

                    <span className="text-sm font-medium">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.productId)}
                      className="rounded-full border border-border px-3 py-1"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-auto text-sm text-coral"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 flex justify-between text-sm">
            <span className="text-text-muted">Subtotal</span>

            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <p className="mt-3 text-sm text-text-muted">
            Shipping and taxes will be calculated later.
          </p>

          <Link href="/checkout">
            <Button className="mt-6 w-full">Continue to Checkout</Button>
          </Link>

          <Button variant="ghost" className="mt-3 w-full" onClick={clearCart}>
            Clear Bag
          </Button>
        </Card>
      </div>
    </PageContainer>
  );
}
