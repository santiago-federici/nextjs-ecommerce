"use client";

import { useContext, useEffect } from "react";

import { WixClientContext } from "@contexts/WixContext";

import { useCartStore } from "@hooks/useCartStore";

import { Separator } from "@components/ui/separator";
import { CheckoutProductCard } from "./CheckoutProductCard";

import { BigCart } from "@components/Icons";
import { formatPrice } from "@lib/utils";

export default function CheckoutProds() {
  const wixClient = useContext(WixClientContext);

  const { cart, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  const productsInCart = cart && cart.lineItems;

  const shipppingAmount = 5000; // Replace this amount with the actual shipping cost

  return (
    <div className="w-full px-4 py-12">
      {productsInCart && productsInCart.length > 0 ? (
        <section className="flex-grow flex-1">
          <ul className="grid gap-4 divide-y">
            {productsInCart.map((product) => (
              <li key={product._id} className="first:pt-0 pt-4">
                <CheckoutProductCard product={product} wixClient={wixClient} />
              </li>
            ))}
          </ul>

          <section>
            <Separator className="my-4" />
            <div className="flex text-base">
              <p className="flex-1">Subtotal:</p>
              {/* Ignore this error. That value actually exists */}
              <p className="font-semibold">{cart.subtotal.formattedAmount}</p>
            </div>

            <div className="flex text-base mt-2">
              <p className="flex-1">Shipping:</p>
              {/* Ignore this error. That value actually exists */}
              <p className="font-semibold">{formatPrice(shipppingAmount)},00</p>
            </div>

            <div className="flex text-base mt-2">
              <p className="flex-1">Total:</p>
              <p className="font-semibold">
                {/* Ignore this error. That value actually exists */}
                {formatPrice(Number(cart.subtotal.amount) + shipppingAmount)},00
              </p>
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
