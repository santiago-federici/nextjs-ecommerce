import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import { products } from "./products";
import { users } from "./users";

export const carts = sqliteTable(
  "carts",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" })
      .references(() => users.id)
      .notNull(),
    productId: integer("product_id", { mode: "number" })
      .references(() => products.id)
      .notNull(),
    quantity: integer("quantity", { mode: "number" }).notNull(),
    createdAt: text("created_at")
      .default(sql`(current_timestamp)`)
      .notNull(),
    updatedAt: text("updated_at")
      .default(sql`(current_timestamp)`)
      .notNull(),
    // session_id: text("session_id").notNull(),
  },
  (table) => ({
    unq: unique().on(table.productId, table.userId),
  })
);
