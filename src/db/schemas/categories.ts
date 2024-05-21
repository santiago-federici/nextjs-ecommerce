import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

//TODO: create field 'parentCategoryId', to make it possible to create subcategories (might need to create another table for subcategories)
