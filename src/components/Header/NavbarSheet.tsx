import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@components/CustomButton"
import { Menu } from "@components/Icons"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signIn } from "next-auth/react"

export function NavbarSheet ({ navLinks, session }: { navLinks: any, session: any }) {

  const pathname = usePathname()
  
  return(
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent side={"left"} className='flex flex-col'>
        <SheetHeader>
          <SheetTitle className='self-start'>Menu</SheetTitle>
        </SheetHeader>

        <ul className='text-black flex flex-col gap-2 w-full mb-20'>
          {
            navLinks.map((link: any, index: number) => {
              return (
                <div
                  key={index}
                >
                  <li
                    className="transition duration-200"
                  >
                    <Link 
                      href={link.href}
                      className={clsx(
                        'font-medium text-lg flex gap-2 cursor-pointer hover:bg-zinc-400 w-full pl-2 py-2 rounded-md transition duration-200 uppercase',
                        {
                          'bg-zinc-300': pathname === link.href 
                        }
                      )}
                    >
                      <span className='lg:hidden'>
                        {link.icon}
                      </span>
                      {link.title}
                    </Link>
                  </li>
                </div>
                )
            })
          }
        </ul> 
          { 
            !session?.user
            ? (
              <SheetFooter className="grid gap-2">
                <SheetTrigger asChild className="w-full">
                  <span
                    onClick={() => signIn()}>
                      <Button as='filled' text='Login' className='lg:hidden w-full' />
                  </span>
                </SheetTrigger>
                <SheetTrigger asChild className="w-full">
                  <span
                    onClick={() => signIn()}>
                      <Button as='outline' text='Register' className='lg:hidden w-full' />
                  </span>
                </SheetTrigger>
              </SheetFooter>
            )
            : <></>
          }
      </SheetContent>
    </Sheet>
  )
}