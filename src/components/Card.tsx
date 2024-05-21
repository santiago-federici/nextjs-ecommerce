import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@lib/utils";

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
  const { id, name, price, imageUrl, offerPercentage, stock, createdAt } = prod;

  return (
    prod && (
      <Link href={"/products/details?id=" + id.toString()}>
        <article className="rounded-sm overflow-hidden cursor-pointer">
          <div className="relative h-48 md:h-72 lg:h-96">
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
          </div>

          <div className="py-2 px-1 grid h-fit place-content-start">
            {stock <= 0 && (
              <p className="text-base text-orange-600 font-medium">
                Out of stock
              </p>
            )}

            {stock > 0 && offerPercentage > 0 && (
              <span className="text-sm text-green-600 font-medium">
                {offerPercentage}% OFF
              </span>
            )}

            <h3 className="text-base lg:text-lg font-medium text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
              {name}
            </h3>

            <div className="flex items-baseline gap-2">
              {offerPercentage > 0 && (
                <p className="text-sm text-gray-500 line-through mt-1">
                  {formatPrice(price)}
                </p>
              )}

              <p className="text-gray-900 text-base font-semibold">
                {formatPrice(price - (price * offerPercentage) / 100)}
              </p>
            </div>
          </div>
        </article>
      </Link>
    )
  );
}
