import { useEffect, useState } from "react";

import { useCartStore } from "@hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";

import { Trash } from "./Icons";

export function CartCard({
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
  const { formattedAmount } = price!;
  const { options } = catalogReference!;
  const { variantId } = options!;

  const { removeItem } = useCartStore();

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
      <div className="flex flex-col gap-2 flex-grow flex-1 ml-4 justify-between">
        <p className="text-sm md:text-base font-semibold">{title}</p>
        <p className="text-xs md:text-sm">
          {quantity} x <span className="font-semibold">{formattedAmount}</span>
        </p>

        {chosenVariant && (
          <div>
            <p className="text-xs font-light">
              Size:{" "}
              <span className="font-semibold">
                {chosenVariant.choices.Size}
              </span>
            </p>
            <p className="text-xs font-light">
              Color:{" "}
              <span className="font-semibold">
                {chosenVariant.choices.Color}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between items-end">
        <p className="text-sm">
          Qty: <span className="font-semibold">{quantity}</span>
        </p>

        <button
          className="text-sm text-custom-accent cursor-pointer transition duration-100"
          onClick={() => removeItem(wixClient, id!)}
        >
          <Trash />
        </button>
      </div>
    </article>
  );
}
