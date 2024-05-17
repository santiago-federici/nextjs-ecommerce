"use client";

import Link from "next/link";
import Image from "next/image";

import { useCart } from "@hooks/useCart";
import { formatPrice } from "@lib/utils";

import { Button } from "@components/ui/button";

import { AddToCart } from "./Icons";
import clsx from "clsx";

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
  createdAt: string;
}

export function Card({ prod }: { prod: ProdProps }) {
  const { increaseQuantity } = useCart();

  const { id, name, price, imageUrl, offerPercentage, stock, createdAt } = prod;

  return (
    prod && (
      <article className="rounded-sm overflow-hidden">
        <div className="relative h-48 md:h-72 lg:h-96 cursor-pointer group grid place-items-center overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-0 lg:group-hover:opacity-60 transition duration-300"></span>

          <span
            onClick={() => increaseQuantity(id, stock)}
            className="text-zinc-500 lg:group-hover:text-white absolute top-2 left-2 z-10 transition duration-200"
          >
            <button
              className="hover:text-custom-accent disabled:cursor-not-allowed"
              disabled={stock <= 0}
            >
              <AddToCart />
            </button>
          </span>

          <Link
            href={"/products/details?id=" + id.toString()}
            className="z-10 hidden lg:flex lg:opacity-0 lg:group-hover:opacity-100"
          >
            <Button
              variant={"outline"}
              className="text-sm text-white bg-transparent hover:bg-transparent hover:text-custom-accent hover:border-custom-accent"
            >
              See details
            </Button>
          </Link>

          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="w-full h-full"
            priority
            className={
              (clsx({
                "blur-[2px]": stock <= 0,
              }),
              "object-cover")
            }
          />

          {offerPercentage > 0 && (
            <span className="bg-green-500 text-white text-sm font-semibold py-2 px-2 rounded-bl-md absolute top-0 -right-1">
              {offerPercentage}% OFF
            </span>
          )}
        </div>

        <div className="py-2 px-1 grid h-fit place-content-start">
          {stock <= 0 && (
            <p className="text-base text-orange-600 font-medium">
              Out of stock
            </p>
          )}

          <h3 className="text-base lg:text-lg font-medium text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
            {name}
          </h3>

          {/* Div containing the price of the product. If offerPercentage is greater than 0, display the 
          discounted price plus the previous price with a line-through. Otherwise, display the original price. */}
          <div className="flex items-baseline gap-2">
            {offerPercentage > 0 ? (
              <>
                <p className="text-sm text-gray-500 line-through mt-1">
                  {formatPrice(price)}
                </p>
                <p className="text-gray-900 text-base font-semibold">
                  {formatPrice(price - (price * offerPercentage) / 100)}
                </p>
              </>
            ) : (
              <p className="text-gray-900 text-base font-semibold">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </article>
    )
  );
}
