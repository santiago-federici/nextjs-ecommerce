"use client";

import { Button } from "@components/ui/button";
import { useState } from "react";

export function QuantitySelector({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-grow flex flex-col">
      <p className="font-semibold mt-4 mb-3">Choose a Quantity</p>

      <article className="flex gap-4 items-center">
        <div className="flex gap-4 items-center rounded-full w-fit border overflow-hidden">
          <span
            className="text-2xl hover:bg-gray-100 cursor-pointer w-full h-full px-3 transition duration-100"
            onClick={() => handleQuantity("decrease")}
          >
            -
          </span>
          <span className="text-base font-medium">{quantity}</span>
          <span
            className="text-2xl hover:bg-gray-100 cursor-pointer w-full h-full px-3 transition duration-100"
            onClick={() => handleQuantity("increase")}
          >
            +
          </span>
        </div>

        <div className="text-xs">
          {stockNumber <= 10 ? (
            <>
              <p>
                Only{" "}
                <span className="text-orange-600">{stockNumber} items</span>{" "}
                left!
              </p>
              <p>Dont miss it!</p>
            </>
          ) : (
            <p>
              <span className="text-orange-600">{stockNumber} items</span>{" "}
              available
            </p>
          )}
        </div>
      </article>

      <div className="w-full flex flex-col gap-2 h-full justify-end mb-3">
        <Button variant={"outline"}>Add to cart</Button>
        <Button>Buy now</Button>
      </div>
    </div>
  );
}
