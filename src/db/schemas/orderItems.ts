import { integer, real, sqliteTable } from "drizzle-orm/sqlite-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = sqliteTable("order_items", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  orderId: integer("order_id", { mode: "number" })
    .references(() => orders.id)
    .notNull(),
  productId: integer("product_id", { mode: "number" })
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity", { mode: "number" }).notNull(),
  price: real("price").notNull(),
});
