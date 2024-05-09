"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Toaster, toast } from "sonner";

import { Button, buttonVariants } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Wrapper } from "@components/Wrapper";
import { GoogleIcon, LogoSVG } from "@components/Icons";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import clsx from "clsx";

const pageInfo = {
  title: "Login",
  registerBtnInfo: "Don't have an account yet? Register here",
  registerLink: "/register",
};

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Wrapper className="grid place-items-center mt-14">
      <div className="grid place-items-center w-full max-w-xl h-fit p-6 bg-white rounded-md shadow-lg">
        <h1 className="font-bold text-3xl mb-4 uppercase">{pageInfo.title}</h1>

        <LogoSVG width="150" height="150" />

        <form className="my-8 w-full grid gap-8">
          <div>
            <Label htmlFor="email" className="ml-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="youremail@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className={clsx({
                "focus-visible:ring-red-500": error.includes("Email"),
              })}
            />
            {error && error.includes("Email") && (
              <p className="text-sm mt-2 text-red-500">{error}</p>
            )}
          </div>

          <LoginLink
            authUrlParams={{
              connection_id:
                process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS ||
                "",
              login_hint: email,
            }}
            className={`bg-[#3b82f6] hover:bg-[#3b82f6] ${buttonVariants({
              variant: "default",
            })} w-full`}
          >
            Login
          </LoginLink>
        </form>

        {/* Separator */}
        <div className="w-[90%] flex gap-2 items-center mb-8">
          <span className="bg-gray-300 h-px w-full"></span>
          <p className="text-gray-400 text-sm">or</p>
          <span className="bg-gray-300 h-px w-full"></span>
        </div>

        <LoginLink
          className={`${buttonVariants({
            variant: "outline",
          })} w-full gap-2`}
          authUrlParams={{
            connection_id:
              process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
          }}
        >
          <GoogleIcon />
          Login with Google
        </LoginLink>

        <Link
          href={pageInfo.registerLink}
          className={buttonVariants({
            variant: "link",
            className: "mt-4 text-blue-500 hover:text-blue-300",
          })}
        >
          {pageInfo.registerBtnInfo}
        </Link>
      </div>

      <Toaster richColors />
    </Wrapper>
  );
}
