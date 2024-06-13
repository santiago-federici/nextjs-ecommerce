"use client";

import { useContext, useEffect } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { WixClientContext } from "@contexts/WixContext";

import { useCartStore } from "@hooks/useCartStore";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartCard } from "@components/CartCard";

import { BigCart, Cart } from "@components/Icons";

export function CartSheet() {
  const wixClient = useContext(WixClientContext);

  const pathname = usePathname();

  const { cart, getCart, cartLength, clearCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  const productsInCart = cart && cart.lineItems;

  return (
    <span
      className={`${
        pathname === "/" ? "text-white" : "text-black"
      } cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200 relative flex items-center justify-center`}
    >
      <Sheet>
        <SheetTrigger>
          <Cart />
        </SheetTrigger>

        <SheetContent className="flex flex-col overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="self-start">
              Shopping cart ({cartLength})
            </SheetTitle>
          </SheetHeader>

          {productsInCart && productsInCart.length > 0 ? (
            <>
              <section className="flex flex-col flex-grow flex-1">
                <ul className="flex flex-col flex-grow flex-1 divide-y">
                  {productsInCart.map((product) => (
                    <li key={product._id} className="py-6">
                      <CartCard product={product} wixClient={wixClient} />
                    </li>
                  ))}
                </ul>

                <Button
                  variant={"ghost"}
                  className="mt-16 place-self-end hover:bg-red-200 hover:text-red-900"
                  onClick={() => clearCart(wixClient)}
                >
                  Clear cart
                </Button>

                <section className="flex flex-col gap-2">
                  <Separator className="my-4" />
                  <div className="flex text-base">
                    <p className="flex-1">Subtotal</p>
                    {/* Ignore this error. That value actually exists */}
                    <p>{cart.subtotal.formattedAmount}</p>
                  </div>
                </section>
              </section>

              <SheetFooter className="w-full">
                <SheetTrigger className="w-full grid gap-2">
                  <Button
                    asChild
                    className="uppercase w-full mt-4 bg-custom-accent hover:bg-pink-400"
                  >
                    <Link href={"/checkout"} className="font-semibold">
                      Checkout
                    </Link>
                  </Button>
                  <div className="flex gap-2 text-sm items-center justify-center">
                    or{" "}
                    <Link
                      href="/products"
                      className="text-custom-accent hover:underline underline-offset-2"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </SheetTrigger>
              </SheetFooter>
            </>
          ) : (
            <section className="flex flex-col items-center mt-20 flex-1">
              <BigCart />
              <p className="text-2xl font-semibold mb-8">Your cart is empty!</p>
              <SheetTrigger asChild>
                <Button asChild variant={"secondary"} className="uppercase">
                  <Link href={"/products"}>See products</Link>
                </Button>
              </SheetTrigger>
            </section>
          )}
        </SheetContent>
      </Sheet>

      <span className="absolute -bottom-1 -right-1 bg-custom-accent text-white font-semibold rounded-full w-5 h-5 flex justify-center items-center text-sm">
        {cartLength}
      </span>
    </span>
  );
}
