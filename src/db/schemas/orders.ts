import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

export const orders = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id)
    .notNull(),
  status: text("status", {
    enum: ["pending", "getting the products ready", "on the way", "delivered"],
  })
    .default("pending")
    .notNull(),
  totalAmount: real("total_amount").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
});
