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
import { CustomSeparator } from "@components/CustomSeparator"
import { BigCart, Cart } from "@components/Icons"
import { useCart } from "@hooks/useCart"
import Link from "next/link"
import { usePathname } from "next/navigation"


export function CartSheet ({ pathname }: { pathname: string }) {

  const { cart, cartQuantity } = useCart()

  return(
    <span 
      className={`${pathname === '/' ? 'text-white' : 'text-black'} cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200 relative flex items-center justify-center`}
    >

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
                  <CustomSeparator />

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
                <p className="text-2xl md:text-3xl font-bold my-4">Your cart is empty!</p>
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

      <span className='absolute -bottom-2 -right-1 bg-custom-accent text-white font-semibold rounded-full w-5 h-5 flex justify-center items-center text-sm'>{cartQuantity}</span>
    </span>
  )
}