import { db } from "@db";
import { carts } from "@db/schemas/carts";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function increaseQuantity(id: number, stock: number) {
  "use server";

  const cart = await db.select().from(carts).where(eq(carts.productId, id));

  // This means the product is already in the cart
  if (cart.length > 0) {
    if (cart[0].quantity < stock) {
      await db
        .update(carts)
        .set({ quantity: cart[0].quantity + 1 })
        .where(eq(carts.productId, id));
      return { success: "Added to cart" };
    }
    return { warning: "Stock limit reached" };
  }

  if (stock > 0) {
    // TODO: get the actual userId
    await db.insert(carts).values({ userId: 1, productId: id, quantity: 1 });
    return { success: "Added to cart" };
  }

  return { error: "This product is out of stock" };
}
