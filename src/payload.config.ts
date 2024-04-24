import dotenv from "dotenv";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " | Next.js Ecommerce", // <-- TODO: add your app name here
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  csrf: [
    // 👇🏽TODO:
    // whitelist of domains to allow cookie auth from
    // 'https://your-frontend-app.com',
    // 'https://your-other-frontend-app.com',
  ],
});
