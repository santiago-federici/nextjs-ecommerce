import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      name: "Google",
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,

      // 👇🏽👇🏽 https://next-auth.js.org/providers/google 👇🏽👇🏽

      // Google only provides Refresh Token to an application the first time a user signs in.
      // To force Google to re-issue a Refresh Token, the user needs to remove the application from their
      // account and sign in again: https://myaccount.google.com/permissions
      // Alternatively, you can also pass options in the params object of authorization which will force the
      // Refresh Token to always be provided on sign in, however this will ask all users to confirm if
      // they wish to grant your application access every time they sign in.
      // If you need access to the RefreshToken or AccessToken for a Google account and you are not using a
      // database to persist user accounts, this may be something you need to do.

      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/products"]; // <-- set the protected paths here
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/register", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
    },
  },
  pages: {
    signIn: "/register",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // events: {
  //   async signIn({ user, isNewUser}: { user: User, isNewUser: isNewUser}): Promise<isNewUser> {
  //     return isNewUser;
  //   }
  // }
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
