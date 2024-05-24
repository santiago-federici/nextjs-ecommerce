"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useCart } from "@hooks/useCart";

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

export function CartSheet({ prods, userId }: { prods: any; userId: string }) {
  const { cart, cartQuantity } = useCart();

  const pathname = usePathname();

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

        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="self-start">
              Cart ({cartQuantity})
            </SheetTitle>
          </SheetHeader>

          {cart.length > 0 ? (
            <section className="flex-grow flex-1">
              <ul className="grid gap-4 mt-14">
                {cart.map((cartProd, index) => {
                  return (
                    <li key={index}>
                      <CartCard
                        prods={prods}
                        cartProdId={cartProd.productId}
                        userId={userId}
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
              <SheetTrigger asChild>
                <Link href={"/products"}>
                  <Button className="uppercase">Shop now</Button>
                </Link>
              </SheetTrigger>
            </section>
          )}

          {cart.length > 0 ? (
            <SheetFooter>
              <SheetTrigger asChild className="w-full">
                <Link href={"/checkout"}>
                  <Button className="uppercase w-full">Checkout</Button>
                </Link>
              </SheetTrigger>
            </SheetFooter>
          ) : null}
        </SheetContent>
      </Sheet>

      <span className="absolute -bottom-2 -right-1 bg-custom-accent text-white font-semibold rounded-full w-5 h-5 flex justify-center items-center text-sm">
        {cartQuantity}
      </span>
    </span>
  );
}
