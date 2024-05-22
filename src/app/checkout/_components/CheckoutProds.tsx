"use client";

import { CartCard } from "@components/CartCard";
import { BigCart } from "@components/Icons";
import { useCart } from "@hooks/useCart";
import { Separator } from "@radix-ui/react-separator";

export default function CheckoutProds({ prods }: { prods: any }) {
  const { cart } = useCart();

  return (
    <div className="w-full">
      {cart.length > 0 ? (
        <section className="flex-grow flex-1">
          <ul className="grid gap-4 mt-14">
            {cart.map((cartProd, index) => {
              return (
                <li key={index}>
                  <CartCard
                    prods={prods}
                    cartProdId={cartProd.id}
                    quantity={cartProd.quantity}
                  />
                </li>
              );
            })}
          </ul>

          <section>
            <Separator className="my-8" />

            <div className="flex">
              <p className="flex-1">Shipping</p>
              <p>$0</p>
            </div>
            <div className="flex">
              <p className="flex-1">Total</p>
              <p>$0</p>
            </div>
          </section>
        </section>
      ) : (
        <section className="flex flex-col items-center mt-20 flex-1">
          <BigCart />
          <p className="text-2xl md:text-3xl font-bold my-4">
            Your cart is empty!
          </p>
        </section>
      )}
    </div>
  );
}
