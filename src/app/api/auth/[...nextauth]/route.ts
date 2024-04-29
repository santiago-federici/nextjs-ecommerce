import User from "@models/user";
import { connectDB } from "@utils/DBconnection";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Invalid credentials");

        const isValidPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValidPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),

    // GoogleProvider({
    //   name: "Google",
    //   clientId: process.env.AUTH_GOOGLE_ID!,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    // }),
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
  },
  pages: {
    signIn: "/register",
  },
});

export { handler as GET, handler as POST };
