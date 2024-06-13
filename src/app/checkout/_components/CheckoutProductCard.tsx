import { useEffect, useState } from "react";

import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";

import { formatPrice } from "@lib/utils";

export function CheckoutProductCard({
  product,
  wixClient,
}: {
  product: currentCart.LineItem;
  wixClient: any;
}) {
  const {
    _id: id,
    image: imageUrl,
    productName,
    price,
    quantity,
    catalogReference,
  } = product;

  const { original: title } = productName!;
  const { amount, formattedAmount } = price!;
  const { options } = catalogReference!;
  const { variantId } = options!;

  const [chosenVariant, setChosenVariant] = useState<any>(null);

  useEffect(() => {
    const getVariants = async () => {
      const res = await wixClient.products
        .queryProducts()
        .eq("name", title)
        .find();
      const product = res.items[0];
      const chosenVariant = product.variants.find(
        (variant: any) => variant._id === variantId
      );
      setChosenVariant(chosenVariant);
    };

    getVariants();
  }, [variantId, title, wixClient.products]);

  return (
    <article className="flex">
      <div className="w-28 h-28 overflow-hidden rounded-md">
        <img
          src={wixMedia.getScaledToFillImageUrl(imageUrl!, 96, 96, {})}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow flex-1 ml-4">
        <p className="text-sm md:text-base font-semibold">{title}</p>

        {chosenVariant && (
          <div className="flex gap-4">
            <p className="text-sm">
              Size:{" "}
              <span className="font-semibold">
                {chosenVariant.choices.Size}
              </span>
            </p>
            <p className="text-sm">
              Color:{" "}
              <span className="font-semibold">
                {chosenVariant.choices.Color}
              </span>
            </p>
          </div>
        )}

        <p className="text-sm">
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>

        <div className="flex gap-4">
          <p className="text-xs">
            Unit price: <span className="font-semibold">{formattedAmount}</span>
          </p>
          <p className="text-xs">
            Total:{" "}
            <span className="font-semibold">
              {formatPrice(Number(amount) * (quantity || 1))}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
