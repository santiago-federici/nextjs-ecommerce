import Image from "next/image";
import Link from "next/link";

import prodNotFound from "../../../../public/prod-not-found.png";

import { Wrapper } from "@components/Wrapper";
import AddToCartButton from "./_components/AddToCartButton";
import ProdOptions from "./_components/ProdOptions";
import Categories from "./_components/Categories";
import ProductImages from "./_components/ProductImages";
import RelatedProductsSection from "./_components/RelatedProductsSection";

import { formatPrice } from "@lib/utils";

import { db } from "@db";
import { eq } from "drizzle-orm";
import { products } from "@db/schemas/products";
import { shirtSizes } from "@db/schemas/shirt-sizes";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "sonner";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { productCategories } from "@db/schemas/productsCategories";

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
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const prods = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(searchParams.id)));

  // Checking that the product actually exists
  const prod = prods.find(
    (prod: ProdProps) => prod.id === Number(searchParams.id)
  );

  // 404 image
  if (!prod) {
    return (
      <Wrapper className="grid place-items-center">
        <Image
          src={prodNotFound}
          alt="Product not found"
          width={500}
          height={500}
          className="drop-shadow-2xl"
        />
      </Wrapper>
    );
  }

  const { id, name, imageUrl, price, description, offerPercentage, stock } =
    prod!;

  // Getting the category options (ProdOptions component is a client component)
  const productOptions = await db
    .select()
    .from(shirtSizes)
    .where(eq(shirtSizes.productId, Number(searchParams.id)));

  // Getting the category (or categories) related to the product. This is used to get the categories NAMES.
  const productCategory = await db
    .select({ categoryId: productCategories.categoryId })
    .from(productCategories)
    .where(eq(productCategories.productId, id));

  return (
    <Wrapper className="lg:py-8 px-16 overflow-hidden bg-[#ffffff] rounded-md lg:border lg:border-gray-100 lg:shadow">
      <div className="mt-6 grid lg:flex gap-2 lg:gap-6">
        <h2 className="lg:hidden font-semibold text-2xl mt-6 ml-2">{name}</h2>

        <ProductImages imageUrl={imageUrl} name={name} />

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

            <ProdOptions productOptions={productOptions} />

            <p>{description}</p>

            <Categories productCategory={productCategory} />
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
                <p className="mb-2 text-gray-400 text-sm">
                  Last unit available
                </p>
              )}

              <Button disabled={stock < 1} className="w-full mb-1">
                <Link href={"/checkout"}>Buy now</Link>
              </Button>
              <AddToCartButton
                prodId={Number(searchParams.id)}
                userId={user?.id}
                stock={stock}
              />
            </div>
          </section>
        </section>
      </div>

      <section className="w-full">
        <Separator className="mt-12 mb-8" />
        <span className="text-base text-gray-600">
          <h3 className="font-semibold text-black text-lg inline mr-2">
            Description:
          </h3>
          {description}. {description}. {description}
        </span>
      </section>

      <Separator className="mt-12 mb-8" />

      <RelatedProductsSection productCategory={productCategory} prodId={id} />

      <Toaster richColors />
    </Wrapper>
  );
}
