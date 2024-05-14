import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { products } from "./products";
import { categories } from "./categories";

const productCategories = sqliteTable(
  "product_categories",
  {
    productId: integer("product_id", { mode: "number" })
      .references(() => products.id)
      .notNull(),
    categoryId: integer("category_id", { mode: "number" })
      .references(() => categories.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.categoryId] }),
    };
  }
);