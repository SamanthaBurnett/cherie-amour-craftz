"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const shipping = subtotal >= 100 ? 0 : 10;

  const tax = subtotal * 0.07;

  const total = subtotal + shipping + tax;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),

      lastName: String(formData.get("lastName") ?? ""),

      email: String(formData.get("email") ?? ""),

      phone: String(formData.get("phone") ?? ""),

      shipping,

      tax,

      items: items.map((item) => ({
        productId: item.productId,

        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Order could not be created.");
      }

      clearCart();

      router.push("/order-confirmation");
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while creating your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Checkout"
        title="Almost yours"
        description="Complete your information to place your order."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">Customer Information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="First Name" name="firstName" />

              <Input label="Last Name" name="lastName" />
            </div>

            <div className="mt-4 grid gap-4">
              <Input label="Email Address" name="email" type="email" />

              <Input label="Phone Number" name="phone" />
            </div>

            <h2 className="mt-10 text-xl font-semibold">Shipping Address</h2>

            <div className="mt-6 grid gap-4">
              <Input label="Street Address" name="streetAddress" />

              <Input label="Apartment (optional)" name="apartment" />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Input label="City" name="city" />

              <Input label="State" name="state" />

              <Input label="ZIP Code" name="zipCode" />
            </div>

            {errorMessage && (
              <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-error">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              className="mt-8 w-full"
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
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

              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
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
