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
import { useState } from "react";

export function RegisterTab({
  mode,
  setMode,
  handleSubmit,
  setEmail,
  setPassword,
  setEmailCode,
  error,
  email,
  message,
}: {
  mode: string;
  setMode: any;
  handleSubmit: any;
  setEmail: any;
  setPassword: any;
  setEmailCode: any;
  error: string;
  email?: string;
  message: string;
}) {
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
        <CardTitle className="text-center">Register</CardTitle>
        <CardDescription className="mx-auto">
          <LogoSVG width="150" height="150" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {mode === "EMAIL_VERIFICATION" ? (
            <div className="space-y-1 relative">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                onChange={(e) => setEmailCode(e.target.value)}
                className={clsx({
                  "ring-4 focus-visible:ring-red-500/50 ring-red-500/50": error,
                })}
              />
            </div>
          ) : (
            <div className="space-y-1 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                onChange={(e) => handleEmailValidation(e.target.value)}
                className={clsx({
                  "ring-4 focus-visible:ring-red-500/50 ring-red-500/50":
                    invalidEmail,
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
            <Label htmlFor="password">Password</Label>
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
            disabled={!isValidEmail(email)}
            className="w-full mt-4"
            onClick={() => setMode("REGISTER")}
          >
            Register
          </Button>
          {message && (
            <p className="text-green-500 text-sm mt-2 text-center">{message}</p>
          )}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
