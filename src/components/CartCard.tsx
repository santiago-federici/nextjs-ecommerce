import { useEffect, useState } from "react";

import { useCartStore } from "@hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";

import { Trash } from "./Icons";

export function CartCard({
  id,
  imageUrl,
  title,
  price,
  wixClient,
  quantity,
  variantId,
}: {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  wixClient: any;
  quantity: number;
  variantId: string;
}) {
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
          src={wixMedia.getScaledToFillImageUrl(imageUrl, 96, 96, {})}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow flex-1 ml-4 justify-between">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm">
          {quantity} x <span className="font-semibold">{price}</span>
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
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>

        <button
          className="text-sm text-custom-accent cursor-pointer transition duration-100"
          onClick={() => removeItem(wixClient, id)}
        >
          <Trash />
        </button>
      </div>
    </article>
  );
}
