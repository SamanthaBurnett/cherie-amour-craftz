"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.07;

  const total = subtotal + shipping + tax;

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Checkout"
        title="Almost yours"
        description="Complete your information to place your order."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="text-xl font-semibold">Customer Information</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input label="First Name" name="First Name" />

            <Input label="Last Name" name="Last Name" />
          </div>

          <div className="mt-4 grid gap-4">
            <Input label="Email Address" name="Email Address" />

            <Input label="Phone Number" name="Phone Number" />
          </div>

          <h2 className="mt-10 text-xl font-semibold">Shipping Address</h2>

          <div className="mt-6 grid gap-4">
            <Input label="Street Address" name="Street Address" />

            <Input label="Apartment (optional)" name="Apartment (optional)" />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Input label="City" name="City" />

            <Input label="State" name="State" />

            <Input label="ZIP Code" name="ZIP Code" />
          </div>

          <Button className="mt-8 w-full">Continue to Payment</Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>

                  <p className="text-sm text-text-muted">Qty {item.quantity}</p>
                </div>

                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax</span>

              <span>${tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-text-muted">
            Payments will be added in a future milestone.
          </p>

          <Link href="/cart">
            <Button variant="secondary" className="mt-4 w-full">
              Back to Bag
            </Button>
          </Link>
        </Card>
      </div>
    </PageContainer>
  );
}
