import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";
import ProdOptions from "./_components/ProdOptions";
import Categories from "./_components/Categories";
import ProductImages from "./_components/ProductImages";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "sonner";
import { Separator } from "@components/ui/separator";
import { QuantitySelector } from "./_components/QuantitySelector";

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
    _id,
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
                  <p className="text-gray-900 text-lg font-semibold">
                    {formattedDiscountedPrice}
                  </p>
                  <span className="text-sm text-green-600 font-semibold">
                    {discount?.value}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-gray-900 text-lg font-semibold">
                  {formattedPrice}
                </p>
              )}
            </div>

            <p>
              {/* TODO: rich text */}
              {additionalInfoSections?.map(
                (section) =>
                  section.title === "SHORT DESCRIPTION" && section.description
              )}
            </p>

            <Categories categoriesIds={collectionIds} />
          </section>

          {variants && productOptions ? (
            <ProdOptions
              productId={_id!}
              variants={variants}
              productOptions={productOptions}
              stock={stock}
            />
          ) : (
            <QuantitySelector
              productId={_id!}
              variantId={"00000000-0000-0000-0000-000000000000"}
              stockNumber={stock?.quantity || 0}
            />
          )}
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
