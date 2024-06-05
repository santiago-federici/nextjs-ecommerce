import Link from "next/link";

import { products } from "@wix/stores";

export function Card({ prod }: { prod: products.Product }) {
  const { name, slug, stock, media, price, discount } = prod!;

  const { url: imageUrl } = media?.mainMedia?.image!;

  const { price: formattedPrice, discountedPrice: formattedDiscountedPrice } =
    price?.formatted!;

  return (
    prod && (
      <article className="max-w-sm overflow-hidden cursor-pointer">
        <Link href={"/products/details?slug=" + slug}>
          <img className="rounded-sm" src={imageUrl} alt={name!} />

          <div className="py-2 px-1 grid h-fit place-content-start">
            {!stock?.inStock && (
              <p className="text-base text-orange-600 font-medium">
                Out of stock
              </p>
            )}

            <h3 className="text-base lg:text-lg font-medium text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
              {name}
            </h3>

            <div className="flex items-baseline gap-2">
              {discount?.value! > 0 && (
                <p className="text-sm text-gray-500 line-through mt-1">
                  {formattedDiscountedPrice}
                </p>
              )}

              <p className="text-gray-900 text-base font-semibold">
                {formattedPrice}
              </p>
            </div>
            {stock?.inStock && discount?.value! > 0 && (
              <span className="text-sm text-green-600 font-semibold">
                {discount?.value}% OFF
              </span>
            )}
          </div>
        </Link>
      </article>
    )
  );
}
