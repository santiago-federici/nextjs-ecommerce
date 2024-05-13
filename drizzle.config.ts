import type { Config } from "drizzle-kit";
export default {
  schema: "./src/db/schemas",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
  dialect: "sqlite",
} satisfies Config;
