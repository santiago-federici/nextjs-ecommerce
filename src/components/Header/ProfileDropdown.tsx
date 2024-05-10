"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "@components/Icons";
import { buttonVariants } from "@components/ui/button";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noUserOptions = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Register",
    link: "/register",
  },
];

const userOptions = [
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "Settings",
    link: "/settings",
  },
  {
    name: "Help",
    link: "/help",
  },
];

export function ProfileDropdown({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`${
            pathname === "/" ? "text-white" : "text-black"
          } hover:scale-105 hover:opacity-70 transition duration-200`}
        >
          <UserCircle />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 lg:ml-0">
          <DropdownMenuLabel>Account settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {!user ? (
              noUserOptions.map((option: any, index: number) => (
                <DropdownMenuItem key={index}>
                  <Link
                    href={option.link}
                    className={`w-full ${buttonVariants({
                      variant: "default",
                    })}`}
                  >
                    {option.name}
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <>
                {userOptions.map((option: any, index: number) => (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <Link href={option.link}>{option.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <LogoutLink className="text-red-500">Logout</LogoutLink>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
