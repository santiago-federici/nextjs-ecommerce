// import { signIn } from "next-auth/react"
import Link from "next/link";

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
  {
    name: "Logout",
    link: "/logout",
  },
];

export function ProfileDropdown({
  session,
  pathname,
}: {
  session: any;
  pathname: string;
}) {
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
            {!session?.user
              ? noUserOptions.map((option: any, index: number) => (
                  <DropdownMenuItem
                    key={index}
                    // onClick={() => signIn()}
                  >
                    <Link
                      href={option.link}
                      className={`${buttonVariants({
                        variant: "default",
                      })} w-full`}
                    >
                      {option.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              : userOptions.map((option: any, index: number) => (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <Link
                      // TODO: add the logout logic
                      href={option.link}
                      className={`${
                        option.name === "Logout" ? "text-red-500" : ""
                      }`}
                    >
                      {option.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
