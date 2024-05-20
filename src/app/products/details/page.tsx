import Image from "next/image";

import { Wrapper } from "@components/Wrapper";
import ProductDetailsButtons from "@components/DetailsPage/ProductDetailsButtons";

import { formatPrice } from "@lib/utils";

import { db } from "@db";
import { products } from "@db/schemas/products";
import { eq } from "drizzle-orm";

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
}

export default async function DetailsPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const prods = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(searchParams.id)));

  // Checking that the product actually exists
  const prod = prods.find(
    (prod: ProdProps) => prod.id === Number(searchParams.id)
  );

  // TODO: create a nice looking 404 here
  if (!prod) {
    return <div>Product not found</div>;
  }

  const { name, imageUrl, price, description, offerPercentage, stock } = prod!;

  return (
    <Wrapper className="mt-6 grid lg:flex gap-2 lg:gap-6 lg:p-8 overflow-hidden bg-[#ffffff] rounded-md lg:border lg:border-gray-100 lg:shadow">
      <h2 className="lg:hidden font-semibold text-2xl mt-6 ml-2">{name}</h2>

      <section className="hidden lg:flex md:flex-col gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-gray-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-gray-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-gray-400 rounded-sm"
        />
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover border border-gray-400 rounded-sm"
        />
      </section>

      <div className="w-full lg:max-w-[40%] bg-[#f0f0f0] grid place-items-center rounded-sm overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={600}
          className="sm:max-lg:w-full md:max-h-[600px] object-contain"
        />
      </div>

      <section className="w-full grid xl:flex gap-6 text-base">
        <section className="w-full flex flex-col gap-4 p-2 ">
          <h2 className="hidden xl:block text-3xl">{name}</h2>

          <div className="flex flex-col">
            {offerPercentage > 0 && (
              <p className="text-gray-600 font-light text-base lg:text-lg line-through">
                {formatPrice(price)}
              </p>
            )}
            <p className="font-light text-2xl lg:text-4xl">
              {formatPrice(price - (price * offerPercentage) / 100)}{" "}
              {offerPercentage > 0 && (
                <span className="text-sm text-green-600">
                  {offerPercentage}% OFF
                </span>
              )}
            </p>
          </div>

          <p className="font-semibold mt-4">Choose size:</p>
          <div className="flex gap-2 mb-4">
            <span className="w-7 h-7 text-sm grid place-items-center rounded-md border border-black bg-black text-white font-semibold">
              S
            </span>
            <span className="w-7 h-7 text-sm grid place-items-center rounded-md border border-gray-200">
              M
            </span>
            <span className="w-7 h-7 text-sm grid place-items-center rounded-md border border-gray-200">
              L
            </span>
          </div>
          <p>{description}</p>
        </section>

        <section className="flex flex-col gap-6 w-full xl:border xl:border-gray-200 xl:rounded-md p-2 xl:p-4">
          <div className="grid gap-1">
            <p className="text-green-500 font-semibold">Free shipping</p>
          </div>

          <div className="grid gap-1">
            <p className="font-semibold text-lg">Available stock</p>
            <p>
              Stored and sent by{" "}
              <span className="uppercase text-green-500 italic font-bold">
                Full
              </span>
            </p>
          </div>

          {stock > 0 ? (
            <p>
              Quantity: <span className="font-semibold">1</span>{" "}
              <span className="text-gray-400">({stock} available)</span>
            </p>
          ) : (
            <p className="text-base text-orange-600 font-medium">
              Out of stock
            </p>
          )}

          <div className="grid gap-1">
            {stock === 1 && (
              <p className="mb-2 text-gray-400 text-sm">Last unit available</p>
            )}
            <ProductDetailsButtons id={Number(searchParams.id)} stock={stock} />
          </div>
        </section>
      </section>
    </Wrapper>
  );
}
