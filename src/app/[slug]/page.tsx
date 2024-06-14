import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";
import ProdOptions from "./_components/ProdOptions";
import Categories from "./_components/Categories";
import ProductImages from "./_components/ProductImages";
import { QuantitySelector } from "./_components/QuantitySelector";
import RelatedProductsSection from "./_components/RelatedProductsSection";

import { Separator } from "@components/ui/separator";

export default async function DetailsPage({
  params,
}: {
  params: { slug: string };
}) {
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
    description,
    additionalInfoSections,
    variants,
    productOptions,
    collectionIds,
  } = product!;

  const { price: formattedPrice, discountedPrice: formattedDiscountedPrice } =
    price?.formatted!;

  return (
    <>
      {/* Big devices Wrapper */}
      <Wrapper className="hidden lg:flex flex-col mb-16 p-12 bg-[#ffffff] border border-gray-100 rounded-md shadow overflow-hidden">
        <div className="flex gap-2 lg:gap-6">
          <ProductImages images={media?.items} />

          <section className="w-full grid lg:flex flex-col xl:flex-row gap-6 text-base">
            <section className="w-full flex flex-col gap-4 p-2 ">
              <h2 className="text-2xl">{name}</h2>

              {/* Price */}
              {discount?.value! > 0 ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-gray-500 line-through mt-1">
                    {formattedPrice}
                  </p>
                  <p className="text-gray-900 text-lg font-semibold">
                    {formattedDiscountedPrice}
                  </p>
                  <span className="text-xs text-green-600 font-semibold">
                    {discount?.value}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-gray-900 text-lg font-semibold">
                  {formattedPrice}
                </p>
              )}

              <p className="text-base font-light my-4">{description}</p>

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
                inStock={stock?.inStock!}
              />
            )}
          </section>
        </div>

        <section className="w-full">
          <Separator className="mt-12 mb-8" />

          <span className="text-base text-gray-600 flex flex-col gap-8">
            {additionalInfoSections?.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-black text-lg mr-2">
                  {section.title}
                </h3>
                {section.description}
              </div>
            ))}
          </span>
        </section>

        <Separator className="mt-12 mb-8" />

        <RelatedProductsSection
          categoriesIds={collectionIds}
          productId={_id!}
        />
      </Wrapper>

      {/* Small devices Wrapper */}
      <Wrapper className="flex flex-col lg:hidden mb-16 overflow-hidden bg-[#ffffff] rounded-md">
        <section className="grid gap-2">
          <h2 className="font-semibold text-2xl">{name}</h2>

          <ProductImages images={media?.items} />

          <section className="w-full grid gap-6 text-base">
            <section className="w-full flex flex-col gap-4 p-2 ">
              {/* Price */}
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
                inStock={stock?.inStock!}
              />
            )}

            <p>{description}</p>

            <Categories categoriesIds={collectionIds} />
          </section>
        </section>

        <section className="w-full">
          <Separator className="mt-12 mb-8" />

          <span className="text-base text-gray-600 flex flex-col gap-8">
            {additionalInfoSections?.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-black text-lg mr-2">
                  {section.title}
                </h3>
                {section.description}
              </div>
            ))}
          </span>
        </section>

        <Separator className="mt-12 mb-8" />

        <RelatedProductsSection
          categoriesIds={collectionIds}
          productId={_id!}
        />
      </Wrapper>
    </>
  );
}
