import Link from "next/link";

import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";
import AddToCartButton from "./_components/AddToCartButton";
import ProdOptions from "./_components/ProdOptions";
import Categories from "./_components/Categories";
import ProductImages from "./_components/ProductImages";
import RelatedProductsSection from "./_components/RelatedProductsSection";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "sonner";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
}

export default async function DetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();
  const product = res.items[0];

  // 404 image
  if (!product) {
    return (
      <Wrapper className="grid place-items-center">
        <img
          src={"../../../../public/prod-not-found.png"}
          alt="Product not found"
          className="drop-shadow-2xl w-[500px] h-[500px]"
        />
      </Wrapper>
    );
  }

  const {
    name,
    stock,
    media,
    price,
    discount,
    additionalInfoSections,
    variants,
    productOptions,
    collectionIds,
  } = product!;

  const { price: formattedPrice, discountedPrice: formattedDiscountedPrice } =
    price?.formatted!;

  return (
    <Wrapper className="mb-16 lg:pt-12 lg:pb-8 lg:px-16 overflow-hidden bg-[#ffffff] rounded-md lg:border lg:border-gray-100 lg:shadow">
      <div className="grid lg:flex gap-2 lg:gap-6">
        <h2 className="lg:hidden font-semibold text-2xl mt-6 ml-2">{name}</h2>

        <ProductImages images={media?.items} />

        <section className="w-full grid xl:flex gap-6 text-base">
          <section className="w-full flex flex-col gap-4 p-2 ">
            <h2 className="hidden xl:block text-3xl">{name}</h2>

            <div className="flex flex-col">
              {discount?.value! > 0 ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-gray-500 line-through mt-1">
                    {formattedPrice}
                  </p>
                  <p className="text-gray-900 text-base font-semibold">
                    {formattedDiscountedPrice}
                  </p>
                  <span className="text-sm text-green-600 font-semibold">
                    {discount?.value}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-gray-900 text-base font-semibold">
                  {formattedPrice}
                </p>
              )}
            </div>

            {variants && productOptions && (
              <ProdOptions
                variants={variants}
                productOptions={productOptions}
              />
            )}

            <p>
              {/* TODO: rich text */}
              {additionalInfoSections?.map(
                (section) =>
                  section.title === "SHORT DESCRIPTION" && section.description
              )}
            </p>

            <Categories categoriesIds={collectionIds} />
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

            {stock?.inStock === true ? (
              <p>
                Quantity: <span className="font-semibold">1</span>{" "}
                <span className="text-gray-400">
                  ({stock?.quantity} available)
                </span>
              </p>
            ) : (
              <p className="text-base text-orange-600 font-medium">
                Out of stock
              </p>
            )}

            <div className="grid gap-1">
              {stock?.quantity === 1 && (
                <p className="mb-2 text-gray-400 text-sm">
                  Last unit available
                </p>
              )}

              <Button disabled={!stock?.inStock} className="w-full mb-1">
                <Link href={"/checkout"}>Buy now</Link>
              </Button>
              {/* <AddToCartButton
                prodId={Number(searchParams.id)}
                userId={user?.id}
                stock={stock}
              /> */}
            </div>
          </section>
        </section>
      </div>

      <section className="w-full">
        <Separator className="mt-12 mb-8" />

        <span className="text-base text-gray-600 flex flex-col gap-8">
          {additionalInfoSections?.map(
            (section) =>
              section.title !== "SHORT DESCRIPTION" && (
                <div key={section.title}>
                  <h3 className="font-semibold text-black text-lg mr-2">
                    {section.title}
                  </h3>
                  {section.description}
                </div>
              )
          )}
        </span>
      </section>

      <Separator className="mt-12 mb-8" />

      {/* <RelatedProductsSection productCategory={productCategory} prodId={id} /> */}

      <Toaster richColors />
    </Wrapper>
  );
}
