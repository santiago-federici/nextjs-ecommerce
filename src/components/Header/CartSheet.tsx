import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartCard } from "@components/CartCard"
import { Button } from "@components/CustomButton"
import { BigCart, Cart } from "@components/Icons"
import { useCart } from "@hooks/useCart"
import Link from "next/link"


export function CartSheet () {

  const { cart } = useCart()
  
  return(
    <Sheet>
      <SheetTrigger>
        <Cart />
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle className='self-start'>Cart (0)</SheetTitle>
        </SheetHeader>

        {
          cart.length > 0
          ? (
            <section className="flex-grow flex-1">
              <ul className="grid gap-4 mt-14">
                {
                  cart.map((prod, index) => {
                    return (
                      <li key={index}>
                        <CartCard 
                          id={prod.id}
                          quantity={prod.quantity}
                        />
                      </li>
                    )
                  })
                }
              </ul>

              <section>
                <div className="w-full h-px bg-zinc-200 mt-8 mb-4"></div>

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
          )
          : (
            <section className="flex flex-col items-center mt-20 flex-1">
              <BigCart />
              <p className="text-3xl font-bold my-4">Your cart is empty!</p>
              <SheetTrigger asChild>
                <Link href={'/products'}>
                  <Button as="filled" text="Shop now" />
                </Link>
              </SheetTrigger>
            </section>
          )
        }

        
        <SheetFooter>
          <SheetTrigger asChild className="w-full">
            <Link href={'/cart'}>
              <Button as="filled" text="Checkout" className="w-full" />
            </Link>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}