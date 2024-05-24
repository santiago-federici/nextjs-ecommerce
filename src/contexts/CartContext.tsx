"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type CartContext = {
  increaseQuantity: (prodId: number, userId: string, stock: number) => void;
  decreaseQuantity: (id: number) => void;
  removeProd: (id: number) => void;
  clearCart: () => void;

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
        return setCart(newCart);
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

  const decreaseQuantity = (id: number) => {
    const indexOfProduct = cart.findIndex((item) => item.productId === id);
    if (indexOfProduct >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[indexOfProduct].quantity > 1) {
        newCart[indexOfProduct].quantity -= 1;
        return setCart(newCart);
      }
      if (newCart[indexOfProduct].quantity === 1) {
        removeProd(id);
      }
    }
  };

  const removeProd = (id: number) => {
    const newCart = cart.filter((item) => item.productId !== id);
    setCart(newCart);
    toast.error("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
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
