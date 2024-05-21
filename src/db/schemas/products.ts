import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }), // <-- generate random string using crypto (https://www.youtube.com/watch?v=4ZhtoOFKFP8&t=645s, min: 14:10)
  name: text("name").notNull().unique(),
  price: real("price").notNull(),
  imageUrl: text("imageUrl").notNull(),
  description: text("description").notNull(),
  stock: integer("stock", { mode: "number" }).notNull(),
  offerPercentage: integer("offerPercentage", { mode: "number" })
    .default(0)
    .notNull(),
  createdAt: text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
});
