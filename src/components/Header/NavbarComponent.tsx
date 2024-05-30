"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@components/ui/button";

import {
  About,
  AccountSettings,
  Contact,
  Home,
  Menu,
  Products,
} from "@components/Icons";

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

export function NavbarComponent({ user }: { user: any }) {
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
              {navLinks.map((link: any, index: number) => (
                <span key={index}>
                  <SheetTrigger asChild>
                    <Button
                      asChild
                      variant={"ghost"}
                      className={`justify-start w-full ${
                        pathname === link.href
                          ? "bg-gray-100 hover:bg-gray-200"
                          : ""
                      }`}
                    >
                      <Link href={link.href} className="flex gap-2 uppercase">
                        {link.icon}
                        {link.title}
                      </Link>
                    </Button>
                  </SheetTrigger>
                </span>
              ))}

              {/* Settings button only rendering when user is logged in */}
              {user && (
                <Button
                  asChild
                  variant={"ghost"}
                  className={`justify-start w-full ${
                    pathname === "/user-settings"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : ""
                  }`}
                >
                  <Link href={"user-settings"} className="flex gap-2 uppercase">
                    <AccountSettings /> Account settings
                  </Link>
                </Button>
              )}
            </ul>
            <SheetFooter className="flex sm:flex-col gap-y-4 items-end flex-1 mb-8">
              {!user ? (
                <>
                  <Button asChild variant={"default"} className="w-full">
                    <Link href="/register">Register</Link>
                  </Button>
                  <Button asChild variant={"outline"} className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                </>
              ) : (
                <SheetTrigger asChild className="w-full">
                  <LogoutLink
                    className={`${buttonVariants({
                      variant: "outline",
                    })} hover:bg-red-200 hover:text-red-950 hover:border-red-300`}
                  >
                    Logout
                  </LogoutLink>
                </SheetTrigger>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
