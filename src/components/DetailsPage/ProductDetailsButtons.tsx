"use client";

import { useCart } from "@hooks/useCart";

import { Button } from "@components/ui/button";
import { Toaster } from "sonner";

export default function ProductDetailsButtons({
  id,
  stock,
}: {
  id: number;
  stock: number;
}) {
  const { increaseQuantity } = useCart();

  return (
    <>
      <Button disabled={stock < 1} className="mb-1">
        Buy now
      </Button>
      <Button
        disabled={stock < 1}
        variant={"outline"}
        className="bg-[#fafafa]"
        onClick={() => increaseQuantity(id, stock)}
      >
        Add to cart
      </Button>

      <Toaster richColors closeButton />
    </>
  );
}
