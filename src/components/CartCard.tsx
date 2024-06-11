import { media as wixMedia } from "@wix/sdk";
import { Trash } from "./Icons";
import { useCartStore } from "@hooks/useCartStore";

export function CartCard({
  id,
  imageUrl,
  title,
  price,
  wixClient,
  quantity,
}: {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  wixClient: any;
  quantity: number;
}) {
  const { removeItem } = useCartStore();

  return (
    <article className="flex">
      <div className="w-28 h-28 overflow-hidden rounded-md">
        <img
          src={wixMedia.getScaledToFillImageUrl(imageUrl, 96, 96, {})}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow flex-1 ml-4">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm">
          Unit price: <span className="font-semibold">{price}</span>
        </p>
        <p className="text-sm">
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>
      </div>
      <button
        className="text-sm text-custom-accent cursor-pointer transition duration-100 self-start"
        onClick={() => removeItem(wixClient, id)}
      >
        <Trash />
      </button>
    </article>
  );
}
