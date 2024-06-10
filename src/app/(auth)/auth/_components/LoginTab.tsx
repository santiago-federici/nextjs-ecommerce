import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";

import { Close, LogoSVG } from "@components/Icons";

import { isValidEmail } from "@lib/utils";

import clsx from "clsx";

export function LoginTab({
  setMode,
  handleSubmit,
  setEmail,
  setPassword,
  error,
  message,
  isLoading,
}: {
  setMode: any;
  handleSubmit: any;
  setEmail: any;
  setPassword: any;
  error: string;
  message: string;
  isLoading: boolean;
}) {
  const [resetPasswordContent, setResetPasswordContent] =
    useState<boolean>(false);

  const [invalidEmail, setInvalidEmail] = useState<boolean | string>(false);

  const handleEmailValidation = (value: string) => {
    if (!isValidEmail(value)) {
      setInvalidEmail("Invalid email");
    } else {
      setInvalidEmail(false);
      setEmail(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
        <CardDescription className="mx-auto">
          <LogoSVG width="150" height="150" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {!resetPasswordContent && (
            <div className="space-y-1 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                onChange={(e) => handleEmailValidation(e.target.value)}
                className={clsx({
                  "ring-4 focus-visible:ring-red-500/50 ring-red-500/50":
                    invalidEmail || error,
                })}
              />
              {invalidEmail && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                  <Close width="20" height="20" />
                </span>
              )}
              {invalidEmail !== false && (
                <p className="text-sm text-red-500 mt-2">{invalidEmail}</p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="password">
              {resetPasswordContent ? "New password" : "Password"}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              className={clsx({
                "ring-4 focus-visible:ring-red-500/50 ring-red-500/50": error,
              })}
            />
          </div>

          <Button
            disabled={invalidEmail !== false || isLoading}
            className="w-full mt-4"
            onClick={() =>
              setMode(resetPasswordContent ? "RESET_PASSWORD" : "LOGIN")
            }
          >
            {resetPasswordContent ? "Submit" : "Login"}
          </Button>
          {message && (
            <p className="text-green-500 text-sm mt-2 text-center">{message}</p>
          )}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>

        <div>
          <Button
            variant={"link"}
            className="text-blue-500 hover:text-blue-600 mt-2"
            onClick={() => setResetPasswordContent((prev) => !prev)}
          >
            {resetPasswordContent ? "Go back to login" : "Forgot password?"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
