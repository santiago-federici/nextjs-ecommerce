"use client";

import { createContext, useEffect, useState } from "react";

import { useLocalCartOperations } from "@hooks/useLocalCartOperations";
import { useDbCartOperations } from "@hooks/useDbCartOperations";

import { CartItem } from "@interfaces/cart";

import { toast } from "sonner";

type CartContext = {
  increaseQuantity: (prodId: number, userId: string, stock: number) => void;
  decreaseQuantity: (prodId: number, userId: string) => void;
  removeProd: (prodId: number, userId: string) => void;
  clearCart: (userId: string) => void;

  cartQuantity: number;
  cart: CartItem[];
};

export const CartContext = createContext({} as CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [initialCart, setInitialCart] = useState<CartItem[] | null>(null);

  const {
    state,
    initializeCart,
    increaseQuantityLocal,
    decreaseQuantityLocal,
    removeProdLocal,
    clearCartLocal,
  } = useLocalCartOperations(initialCart);

  const { increaseQuantityDb, decreaseQuantityDb, removeProdDb, clearCartDb } =
    useDbCartOperations();

  useEffect(() => {
    const findUserCarts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/cart/find-user-carts"
        );
        const data = await res.json();

        if (data.length > 0) {
          return setInitialCart(data);
        }
        setInitialCart(JSON.parse(localStorage.getItem("cart")!) || []);
      } catch (err) {
        console.error(err);
      }
    };

    findUserCarts();
  }, []);

  useEffect(() => {
    if (initialCart !== null) {
      initializeCart(initialCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCart]);

  useEffect(() => {
    const { success, warning, error } = state;

    warning && toast.warning(warning);
    success && toast.success(success);
    error && toast.error(error);
  }, [state]);

  const increaseQuantity = async (
    prodId: number,
    userId: string,
    stock: number
  ) => {
    increaseQuantityLocal(prodId, stock);
    await increaseQuantityDb(prodId, userId, stock);
  };

  const decreaseQuantity = async (prodId: number, userId: string) => {
    decreaseQuantityLocal(prodId);
    await decreaseQuantityDb(prodId, userId);
  };

  const removeProd = async (prodId: number, userId?: string) => {
    removeProdLocal(prodId);
    await removeProdDb(prodId, userId!);
  };

  const clearCart = async (userId: string) => {
    clearCartLocal();
    await clearCartDb(userId);
  };

  if (initialCart === null) {
    return null; // or a loading spinner
  }

  return (
    <CartContext.Provider
      value={{
        increaseQuantity,
        removeProd,
        decreaseQuantity,
        clearCart,
        cart: state.cart,
        cartQuantity: state.cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
