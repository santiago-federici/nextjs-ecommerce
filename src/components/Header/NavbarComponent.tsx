import { usePathname } from "next/navigation";
// import { signIn } from "next-auth/react"
import Link from "next/link";
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@components/ui/button";

import { About, Contact, Home, Menu, Products } from "@components/Icons";

const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <Products />,
  },
  {
    title: "About",
    href: "/about",
    icon: <About />,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Contact />,
  },
];

const btnsInfo = [
  {
    text: "Login",
    href: "/login",
  },
  {
    text: "Register",
    href: "/register",
  },
];

export function NavbarComponent({ session }: { session: any }) {
  const pathname = usePathname();

  return (
    <>
      <ul
        className={`${
          pathname === "/" ? "text-white" : "text-black"
        } hidden lg:flex gap-4 items-center order-2`}
      >
        {navLinks.map((link, index) => {
          return (
            <li
              key={index}
              className={clsx(
                "font-medium flex gap-2 hover:text-custom-accent cursor-pointer transition duration-200 uppercase",
                {
                  "text-custom-accent": pathname === link.href,
                }
              )}
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          );
        })}
      </ul>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            className={`${
              pathname === "/" ? "text-white" : "text-black"
            } lg:hidden cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200 max-lg:order-1`}
          >
            <Menu />
          </SheetTrigger>

          <SheetContent side={"left"} className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="self-start">Menu</SheetTitle>
            </SheetHeader>

            <ul className="text-black flex flex-col gap-2 w-full mb-20">
              {navLinks.map((link: any, index: number) => {
                return (
                  <div key={index}>
                    <li className="transition duration-200">
                      <SheetTrigger asChild>
                        <Link
                          href={link.href}
                          className={clsx(
                            "font-medium text-lg flex gap-2 cursor-pointer hover:bg-zinc-400 w-full pl-2 py-2 rounded-md transition duration-200 uppercase",
                            {
                              "bg-zinc-300": pathname === link.href,
                            }
                          )}
                        >
                          <span className="lg:hidden">{link.icon}</span>
                          {link.title}
                        </Link>
                      </SheetTrigger>
                    </li>
                  </div>
                );
              })}
            </ul>
            {!session?.user ? (
              <SheetFooter className="flex flex-col gap-2">
                <SheetTrigger asChild className="w-full">
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "default" })}
                  >
                    Login
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild className="w-full">
                  <Link
                    href="/register"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Register
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            ) : (
              <></>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
