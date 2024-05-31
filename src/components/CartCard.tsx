import { useCart } from "@hooks/useCart";

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
  const { removeProd } = useCart();

  const prod = prods.find((prod: any) => prod.id === cartProdId);

  if (!prod) return <div>Product not found</div>;

  const { id: prodId, name, imageUrl, price, offerPercentage, stock } = prod;

  return (
    prod && (
      <article className="flex gap-4 w-full">
        <img src={imageUrl} alt={name} className="w-32 h-32 rounded" />

        <section className="py-1 flex flex-col gap-2 w-full">
          <div className="flex-1">
            <h3 className="text-lg">{name}</h3>
            <p className="text-base font-medium">
              {formatPrice(price - price * (offerPercentage / 100))}
            </p>
          </div>

          <div className="flex  items-center justify-between">
            <p className="text-sm font-light">Qty: {quantity}</p>
            <p
              onClick={() => removeProd(prodId, userId)}
              className="text-sm cursor-pointer text-custom-accent transition duration-200"
            >
              Remove
            </p>
          </div>
        </section>
      </article>
    )
  );
}
