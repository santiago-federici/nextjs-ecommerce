"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@components/ui/button";

import { UserCircle } from "@components/Icons";
import LogoutButton from "./LogoutButton";

const accountOptions = [
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

export function ProfileDropdown({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex">
      {isUserLoggedIn ? (
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
              {accountOptions.map((option: any, index: number) => (
                <DropdownMenuItem key={index} className="cursor-pointer">
                  <Link href={option.link}>{option.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          asChild
          variant={pathname === "/" ? "secondary" : "default"}
          className="mr-2 uppercase hidden lg:flex"
        >
          <Link href={"/register"}>Register</Link>
        </Button>
      )}
    </div>
  );
}
