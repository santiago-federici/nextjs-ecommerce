"use client";

import { useCart } from "@hooks/useCart";

import { Button } from "@components/ui/button";
import { Toaster } from "sonner";
import Link from "next/link";

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
      <Link href={"/checkout"}>
        <Button disabled={stock < 1} className="w-full mb-1">
          Buy now
        </Button>
      </Link>
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
