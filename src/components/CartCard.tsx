import Image from "next/image";
import { useCart } from "@hooks/useCart";

import { Minus, Plus, Trash } from "./Icons";
import { formatPrice } from "@lib/utils";

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
}

export function CartCard({
  prods,
  cartProdId,
  userId,
  quantity,
}: {
  prods: ProdProps[];
  cartProdId: number;
  userId: string;
  quantity: number;
}) {
  const { increaseQuantity, decreaseQuantity, removeProd } = useCart();

  const prod = prods.find((prod: any) => prod.id === cartProdId);

  if (!prod) return <div>Product not found</div>;

  const { id: prodId, name, imageUrl, price, offerPercentage, stock } = prod;

  return (
    prod && (
      <article className="flex gap-4 w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={128}
          height={128}
          className="w-32 h-32"
        />

        <section className="py-2 flex flex-col gap-2 w-full">
          <div className="flex-1">
            <h3 className="text-base md:text-lg">{name}</h3>
            <p className="text-xl font-semibold">
              {formatPrice(price - price * (offerPercentage / 100))}
            </p>
          </div>

          <div className="flex  items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                onClick={() => decreaseQuantity(prodId, userId)}
                className="cursor-pointer hover:text-custom-accent transition duration-200"
              >
                <Minus />
              </span>
              <p className="text-lg">{quantity}</p>
              <span
                onClick={() => increaseQuantity(prodId, userId, stock)}
                className="cursor-pointer hover:text-custom-accent transition duration-200"
              >
                <Plus />
              </span>
            </div>

            <span
              onClick={() => removeProd(prodId, userId)}
              className="cursor-pointer hover:text-custom-accent transition duration-200"
            >
              <Trash />
            </span>
          </div>
        </section>
      </article>
    )
  );
}
