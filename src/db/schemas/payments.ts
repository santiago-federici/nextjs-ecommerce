import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const payments = sqliteTable("payments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  amount: integer("amount", { mode: "number" }).notNull(),
  message: text("message"),
  createdAt: text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
});
