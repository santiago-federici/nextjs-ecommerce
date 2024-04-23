import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  collections: [],
  routes: {
    admin: "/admin",
  },
  admin: {
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
