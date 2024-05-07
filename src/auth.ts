import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import User from "@/models/user";
// import { connectDB } from "@utils/DBconnection";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any; // TODO: set the props instead of using any
      return session;
    },
    // async signIn({ user, account }) {
    //   if (account?.provider === "google") {
    //     await connectDB();
    //     const userFound = await User.findOne({ email: user?.email });

    //     if (!userFound) {
    //       const newUser = new User({
    //         email: user?.email,
    //         googleId: user?.id,
    //         provider: account?.provider,
    //       });

    //       const savedUser = await newUser.save();

    //       return savedUser;
    //     }

    //     return userFound;
    //   }
    // },
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
});