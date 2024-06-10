"use client";

import { useContext, useState } from "react";

import { WixClientContext } from "@contexts/WixContext";
import { LoginState } from "@wix/sdk";

import Cookies from "js-cookie";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginTab } from "./_components/LoginTab";
import { RegisterTab } from "./_components/RegisterTab";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState();
  const [emailCode, setEmailCode] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("");

  const wixClient = useContext(WixClientContext);

  const isLoggedIn = wixClient.auth.loggedIn();

  const router = useRouter();

  if (isLoggedIn) return router.push("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let res;
      if (mode === "LOGIN") {
        res = await wixClient.auth.login({
          email: email!,
          password: password!,
        });
      }
      if (mode === "REGISTER") {
        console.log("here");
        res = await wixClient.auth.register({
          email: email!,
          password: password!,
        });
      }
      if (mode === "RESET_PASSWORD") {
        const redirectUri = window.location.href.toString();
        console.log(redirectUri);
        res = await wixClient.auth.sendPasswordResetEmail(email!, redirectUri);
      }
      if (mode === "EMAIL_VERIFICATION") {
        res = await wixClient.auth.processVerification({
          verificationCode: emailCode!,
        });
      }

      if (res?.loginState === LoginState.SUCCESS) {
        setMessage("Successful! You are being redirected.");

        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          res.data.sessionToken!
        );

        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
          expires: 2,
        });

        wixClient.auth.setTokens(tokens);

        router.push("/");
      }
      if (res?.loginState === LoginState.FAILURE) {
      }
      if (res?.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
      }
      if (res?.loginState === LoginState.OWNER_APPROVAL_REQUIRED) {
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px] mx-auto mt-20">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginTab
          setMode={setMode}
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          error={error!}
          email={email}
          message={message}
          isLoading={isLoading}
        />
      </TabsContent>
      <TabsContent value="register">
        <RegisterTab
          setMode={setMode}
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          setRepeatPassword={setRepeatPassword}
          error={error!}
          email={email}
          message={message}
        />
      </TabsContent>
    </Tabs>
  );
}
