// import { signIn } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@components/CustomButton";
import { UserCircle } from "@components/Icons";
import { buttonVariants } from "@components/ui/button";

const noUserOptions = [
  {
    name: "Login",
  },
  {
    name: "Register",
  },
];

const userOptions = [
  {
    name: "Profile",
  },
  {
    name: "Orders",
  },
  {
    name: "Settings",
  },
  {
    name: "Help",
  },
  {
    name: "Logout",
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
                    <Button as="filled" text={option.name} className="w-full" />
                  </DropdownMenuItem>
                ))
              : userOptions.map((option: any, index: number) => (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <p
                      className={`${
                        option.name === "Logout" ? "text-red-500" : ""
                      }`}
                    >
                      {option.name}
                    </p>
                  </DropdownMenuItem>
                ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
