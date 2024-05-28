import Link from "next/link";

import { formatPrice } from "@lib/utils";

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
      <article className="max-w-sm overflow-hidden cursor-pointer">
        <Link href={"/products/details?id=" + id.toString()}>
          <img className="rounded-sm" src={imageUrl} alt={name} />

          <div className="py-2 px-1 grid h-fit place-content-start">
            {stock <= 0 && (
              <p className="text-base text-orange-600 font-medium">
                Out of stock
              </p>
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
            {stock > 0 && offerPercentage > 0 && (
              <span className="text-sm text-green-600 font-semibold">
                {offerPercentage}% OFF
              </span>
            )}
          </div>
        </Link>
      </article>
    )
  );
}
