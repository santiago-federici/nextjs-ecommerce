"use client";

import { createContext, useState } from "react";
import { toast } from "sonner";

type CartContext = {
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeProd: (id: number) => void;
  clearCart: () => void;

  cartQuantity: number;
  cart: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

export const CartContext = createContext({} as CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const increaseQuantity = (id: number) => {
    const indexOfProduct = cart.findIndex((item) => item.id === id);

    if (indexOfProduct >= 0) {
      const newCart = structuredClone(cart);
      newCart[indexOfProduct].quantity += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        id,
        quantity: 1,
      },
    ]);
    toast.success("Added to cart");
  };

  const decreaseQuantity = (id: number) => {
    const indexOfProduct = cart.findIndex((item) => item.id === id);
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
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    toast.warning("Product removed from cart");
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
