"use client";

import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { useCart } from "@hooks/useCart";

export default function AddToCartButton({
  prodId,
  userId,
  stock,
}: {
  prodId: number;
  userId?: string;
  stock: number;
}) {
  const { increaseQuantity } = useCart();

  return (
    <Button
      type="submit"
      disabled={stock < 1}
      variant={"outline"}
      className="bg-[#fafafa] w-full"
      onClick={() => increaseQuantity(prodId, userId as string, stock)}
    >
      Add to cart
    </Button>
  );
}
