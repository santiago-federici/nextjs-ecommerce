"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Wrapper } from "@components/Wrapper";
import { Close, GoogleIcon, LogoSVG } from "@components/Icons";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import clsx from "clsx";

const pageInfo = {
  title: "Create an account",
  loginBtnInfo: "Already have an account? Login here",
  loginLink: "/login",
};

const isValidEmail = (email: any) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function RegisterPage() {
  const [error, setError] = useState<string | boolean>();
  const [email, setEmail] = useState();

  async function handleChange(e: any) {
    setEmail(e.target.value);
    if (!isValidEmail(email)) {
      setError("Invalid email");
    }

    if (isValidEmail(email)) {
      setError(false);
    }
  }

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
            <div className="relative">
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="youremail@example.com"
                onChange={(e) => handleChange(e)}
                className={clsx({
                  "ring-4 focus-visible:ring-red-500/50 ring-red-500/50": error,
                })}
              />
              {error && (
                <span className="absolute right-2 top-[10px] text-red-500">
                  <Close width="20" height="20" />
                </span>
              )}
            </div>
            <p className="text-sm text-red-500 mt-2 ml-2">{error}</p>
          </div>

          {isValidEmail(email) && !error ? (
            <RegisterLink
              authUrlParams={{
                connection_id:
                  process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS ||
                  "",
                login_hint: email!,
              }}
              className={`bg-[#3b82f6] hover:bg-[#3b82f6] ${buttonVariants({
                variant: "default",
              })} w-full`}
            >
              Register
            </RegisterLink>
          ) : (
            <Button
              onClick={(e) => e.preventDefault()}
              className="cursor-not-allowed"
            >
              Register
            </Button>
          )}
        </form>

        {/* Separator */}
        <div className="w-[90%] flex gap-2 items-center mb-8">
          <span className="bg-gray-300 h-px w-full"></span>
          <p className="text-gray-400 text-sm">or</p>
          <span className="bg-gray-300 h-px w-full"></span>
        </div>

        <RegisterLink
          className={`${buttonVariants({
            variant: "outline",
          })} w-full gap-2`}
          authUrlParams={{
            connection_id:
              process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
          }}
        >
          <GoogleIcon />
          Register with Google
        </RegisterLink>

        <Link
          href={pageInfo.loginLink}
          className={buttonVariants({
            variant: "link",
            className: "mt-4 text-blue-500 hover:text-blue-300",
          })}
        >
          {pageInfo.loginBtnInfo}
        </Link>
      </div>
    </Wrapper>
  );
}
