"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type CartContext = {
  increaseQuantity: (prodId: number, userId: string, stock: number) => void;
  decreaseQuantity: (prodId: number, userId: string) => void;
  removeProd: (prodId: number, userId: string) => void;
  clearCart: (userId: string) => void;

  cartQuantity: number;
  cart: CartItem[];
};

type CartItem = {
  productId: number;
  quantity: number;
};

export const CartContext = createContext({} as CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const findUserCarts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/cart/find-user-carts"
        );
        const carts = await res.json();
        if (carts.length > 0) {
          setCart(carts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    findUserCarts();
  }, []);

  const increaseQuantityLocal = (id: number, stock: number): any => {
    const indexOfProduct = cart.findIndex((item) => item.productId === id);

    if (indexOfProduct >= 0) {
      if (cart[indexOfProduct].quantity < stock) {
        const newCart = structuredClone(cart);
        newCart[indexOfProduct].quantity += 1;
        setCart(newCart);
        return { update: "Product quantity updated" };
      }

      return { warning: "Stock limit reached" };
    }

    if (stock > 0) {
      setCart((prevState) => [
        ...prevState,
        {
          productId: id,
          quantity: 1,
        },
      ]);
      return { success: "Added to cart" };
    }

    return { error: "This product is out of stock" };
  };

  const increaseQuantityDb = async (
    prodId: number,
    userId: string,
    stock: number
  ) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/cart/increase-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prodId, userId, stock }),
        }
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQuantity = async (
    prodId: number,
    userId: string,
    stock: number
  ) => {
    const localData = increaseQuantityLocal(prodId, stock);
    const dbData = await increaseQuantityDb(prodId, userId, stock);

    if (dbData.warning && localData.warning) {
      toast.warning(localData.warning);
    }
    if (dbData.success && localData.success) {
      toast.success(localData.success);
    }
    if (dbData.error && localData.error) {
      toast.error(localData.error);
    }
  };

  const decreaseQuantityLocal = (prodId: number): any => {
    const indexOfProduct = cart.findIndex((item) => item.productId === prodId);
    if (indexOfProduct >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[indexOfProduct].quantity > 1) {
        newCart[indexOfProduct].quantity -= 1;
        setCart(newCart);
        return { update: "Product quantity updated" };
      }
      if (newCart[indexOfProduct].quantity === 1) {
        return removeProd(prodId);
      }
    }

    return { error: "Failed to decrease quantity" };
  };

  const decreaseQuantityDb = async (prodId: number, userId: string) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/cart/decrease-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prodId, userId }),
        }
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (prodId: number, userId: string) => {
    const localData = decreaseQuantityLocal(prodId);
    const dbData = await decreaseQuantityDb(prodId, userId);

    if (dbData.success && localData.success) {
      return toast.success(localData.success);
    }
  };

  const removeProdLocal = (prodId: number): any => {
    const newCart = cart.filter((item) => item.productId !== prodId);
    setCart(newCart);
    return { success: "Product removed from cart" };
  };
  const removeProdDb = async (prodId: number, userId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/remove-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prodId, userId }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const removeProd = async (prodId: number, userId?: string) => {
    const localData = removeProdLocal(prodId);
    const dbData = await removeProdDb(prodId, userId!);
    if (dbData.success && localData.success) {
      return toast.success(localData.success);
    }
  };

  const clearCartLocal = () => {
    setCart([]);
    return { success: "Cart cleared" };
  };
  const clearCartDb = async (userId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/clear-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const clearCart = async (userId: string) => {
    const localData = clearCartLocal();
    const dbData = await clearCartDb(userId);
    if (dbData.success && localData.success) toast.success(localData.success);
  };

  const cartQuantity = cart.length;

  return (
    <CartContext.Provider
      value={{
        increaseQuantity,
        removeProd,
        decreaseQuantity,
        clearCart,
        cart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
