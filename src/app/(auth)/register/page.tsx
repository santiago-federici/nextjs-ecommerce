"use client";

import { LogoSVG } from "@components/Icons";
import { Wrapper } from "@components/Wrapper";
import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Wrapper className="grid place-items-center mt-14">
      <div className="grid place-items-center w-full max-w-xl h-fit p-6 bg-white rounded-md shadow-lg">
        <h1 className="font-bold text-3xl mb-4 uppercase">Create an account</h1>

        <LogoSVG width="150" height="150" />

        <form className="my-8 w-full grid gap-4">
          <div>
            <Label htmlFor="email" className="ml-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="ml-1">
              Password
            </Label>
            <Input id="password" type="password" placeholder="password" />
          </div>

          <Button className="bg-blue-500 hover:bg-blue-400 mt-6">
            Sign Up
          </Button>
        </form>

        <Link
          href="/signIn"
          className={buttonVariants({
            variant: "link",
            className: "mt-6 text-blue-500 hover:text-blue-300",
          })}
        >
          Already have an account? Signin
        </Link>
      </div>
    </Wrapper>
  );
}
