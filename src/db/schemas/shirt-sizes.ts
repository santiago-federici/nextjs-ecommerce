import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";

export const shirtSizes = sqliteTable("shirt_sizes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  option: text("option", {
    enum: ["xs", "s", "m", "l", "xl", "xxl"],
  }).notNull(),
  productId: integer("product_id", { mode: "number" })
    .references(() => products.id)
    .notNull(),
});
