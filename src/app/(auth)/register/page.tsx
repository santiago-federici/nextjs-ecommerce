"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Toaster, toast } from "sonner";

import { Button, buttonVariants } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Wrapper } from "@components/Wrapper";
import { GoogleIcon, LogoSVG } from "@components/Icons";

const pageInfo = {
  title: "Create an account",
  linkToLogin: "Already have an account? Login here",
};

export default function RegisterPage() {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      const authRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (data.message) setError(data.message);
      if (data.success) toast.success(data.success);

      if (authRes?.ok) return router.push("/products");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Wrapper className="grid place-items-center mt-14">
      <div className="grid place-items-center w-full max-w-xl h-fit p-6 bg-white rounded-md shadow-lg">
        <h1 className="font-bold text-3xl mb-4 uppercase">{pageInfo.title}</h1>

        <LogoSVG width="150" height="150" />

        <form onSubmit={handleSubmit} className="my-8 w-full grid gap-4">
          <div>
            <Label htmlFor="email" className="ml-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="youremail@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="ml-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="******"
            />
          </div>

          <Button className="bg-blue-500 hover:bg-blue-400 mt-6">
            Sign In
          </Button>
        </form>

        {/* Separator */}
        <div className="w-[90%] flex gap-2 items-center mb-8">
          <span className="bg-gray-300 h-px w-full"></span>
          <p className="text-gray-400 text-sm">or</p>
          <span className="bg-gray-300 h-px w-full"></span>
        </div>

        <Button
          // onClick={async () => {
          // await signIn("google");
          // }}
          className="bg-transparent hover:bg-gray-200 text-black border border-gray-200 gap-2 w-full"
        >
          <GoogleIcon />
          Sign in with Google
        </Button>

        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
            className: "mt-4 text-blue-500 hover:text-blue-300",
          })}
        >
          {pageInfo.linkToLogin}
        </Link>
      </div>

      <Toaster richColors />
    </Wrapper>
  );
}
