"use client";

import { Button } from "@components/ui/button";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { Alert } from "@components/Icons";

export default function ProductDetailsButtons({
  id,
  stock,
}: {
  id: number;
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
          body: JSON.stringify({ id, stock }),
        }
      );
      const data = await res.json();

      if (data.warning) {
        toast.warning(data.warninig);
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
    <>
      <Button disabled={stock < 1} className="w-full mb-1">
        <Link href={"/checkout"}>Buy now</Link>
      </Button>

      <Button
        type="submit"
        disabled={stock < 1}
        variant={"outline"}
        className="bg-[#fafafa] w-full"
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>

      <Toaster richColors />
    </>
  );
}
