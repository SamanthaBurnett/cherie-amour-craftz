"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  productId: string;
  title: string;
  price: string;
  imageUrl?: string | null;
  disabled?: boolean;
};

export function AddToCartButton({
  productId,
  title,
  price,
  imageUrl,
  disabled = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      disabled={disabled}
      onClick={() =>
        addToCart({
          productId,

          title,

          price: Number(price),

          imageUrl,
        })
      }
      className="disabled:cursor-not-allowed disabled:opacity-50"
    >
      Add to Bag
    </Button>
  );
}
