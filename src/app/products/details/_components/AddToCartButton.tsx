"use client";

import { Button } from "@components/ui/button";
import { toast } from "sonner";

export default function AddToCartButton({
  prodId,
  userId,
  stock,
}: {
  prodId: number;
  userId?: string;
  stock: number;
}) {
  const handleAddToCart = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/cart/increase-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prodId, userId, stock }),
        }
      );
      const data = await res.json();

      if (data.warning) {
        toast.warning(data.warning);
      }
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      type="submit"
      disabled={stock < 1}
      variant={"outline"}
      className="bg-[#fafafa] w-full"
      onClick={handleAddToCart}
    >
      Add to cart
    </Button>
  );
}
