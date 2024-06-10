import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";

import { Close, LogoSVG } from "@components/Icons";

import { isValidEmail } from "@lib/utils";

import clsx from "clsx";

export function RegisterTab({
  setMode,
  handleSubmit,
  setEmail,
  setPassword,
  setRepeatPassword,
  error,
  email,
  message,
}: {
  setMode: any;
  handleSubmit: any;
  setEmail: any;
  setPassword: any;
  setRepeatPassword: any;
  error: string;
  email?: string;
  message: string;
}) {
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
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className={clsx({
                "ring-4 focus-visible:ring-red-500/50 ring-red-500/50": error,
              })}
            />
            {error && (
              <span className="absolute right-2 top-[10px] text-red-500">
                <Close width="20" height="20" />
              </span>
            )}
            <p className="text-sm text-red-500 mt-2 ml-2">{error}</p>
          </div>
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
          <div className="space-y-1">
            <Label htmlFor="repeat-password">Repeat password</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={clsx({
                "ring-4 focus-visible:ring-red-500/50 ring-red-500/50": error,
              })}
            />
          </div>
          <Button
            disabled={!isValidEmail(email) || error !== ""}
            className="w-full mt-4"
            onClick={() => setMode("REGISTER")}
          >
            Register
          </Button>
          {message && (
            <p className="text-green-500 text-sm mt-2 text-center">{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
