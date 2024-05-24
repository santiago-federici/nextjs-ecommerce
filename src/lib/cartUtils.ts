import { db } from "@db";
import { carts } from "@db/schemas/carts";
import { and, eq } from "drizzle-orm";

export async function increaseQuantity(
  prodId: number,
  userId: string,
  stock: number
) {
  "use server";

  const cart = await db
    .select()
    .from(carts)
    .where(and(eq(carts.productId, prodId), eq(carts.userId, userId)));

  if (cart.length > 0) {
    if (cart[0].quantity < stock) {
      await db
        .update(carts)
        .set({ quantity: cart[0].quantity + 1 })
        .where(and(eq(carts.productId, prodId), eq(carts.userId, userId)));
      return { update: "Product quantity updated" };
    } else {
      return { warning: "Stock limit reached" };
    }
  }

  if (stock > 0) {
    await db.insert(carts).values({ userId, productId: prodId, quantity: 1 });
    return { success: "Added to cart" };
  }

  return { error: "This product is out of stock" };
}

export async function decreaseQuantity(prodId: number, userId: string) {
  "use server";

  const cart = await db
    .select()
    .from(carts)
    .where(and(eq(carts.productId, prodId), eq(carts.userId, userId)));

  if (cart.length > 0) {
    if (cart[0].quantity > 1) {
      await db
        .update(carts)
        .set({ quantity: cart[0].quantity - 1 })
        .where(and(eq(carts.productId, prodId), eq(carts.userId, userId)));
      return { update: "Product quantity updated" };
    }

    if (cart[0].quantity === 1) {
      return removeProd(prodId, userId);
    }
  }

  return { error: "Product not found in the cart" };
}

export async function removeProd(prodId: number, userId: string) {
  await db
    .delete(carts)
    .where(and(eq(carts.productId, prodId), eq(carts.userId, userId)));
  return { success: "Product removed from cart" };
}

export async function clearCart(userId: string) {
  const cart = await db.delete(carts).where(eq(carts.userId, userId));
  if (cart.rowsAffected > 0) return { success: "Cart cleared" };
  return { error: "Failed to clear cart" };
}
