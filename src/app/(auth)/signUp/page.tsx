"use client";

import { LogoSVG } from "@components/Icons";
import { Wrapper } from "@components/Wrapper";
import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@lib/validators/AccountCredentialsValidator";
import { trpc } from "@/trpc/client";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { data } = trpc.anyApiRoute.useQuery();
  console.log(data);

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {};

  return (
    <Wrapper className="grid place-items-center mt-14 h-full">
      <h1 className="font-bold text-3xl">Create an account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 w-full grid gap-4 max-w-md"
      >
        <div>
          <Label htmlFor="email" className="ml-1">
            Email
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="youremail@example.com"
            className={clsx("", {
              "focus-visible:ring-red-500": errors.email,
            })}
          />
        </div>
        <div>
          <Label htmlFor="password" className="ml-1">
            Password
          </Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="password"
            className={clsx("", {
              "focus-visible:ring-red-500": errors.password,
            })}
          />
        </div>

        <Button className="bg-blue-500 hover:bg-blue-400 mt-6">Sign Up</Button>
      </form>

      <div className="bg-white p-1 rounded-full">
        <LogoSVG width="150" height="150" />
      </div>
      <Link
        href="/signIn"
        className={buttonVariants({
          variant: "link",
          className: "mt-10 text-blue-500 hover:text-blue-300",
        })}
      >
        Already have an account? Signin
      </Link>
    </Wrapper>
  );
}
