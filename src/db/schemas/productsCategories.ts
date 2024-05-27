import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { products } from "./products";
import { categories } from "./categories";

export const productCategories = sqliteTable("product_categories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  productId: integer("product_id", { mode: "number" })
    .references(() => products.id)
    .notNull(),
  categoryId: integer("category_id", { mode: "number" })
    .references(() => categories.id)
    .notNull(),
});
