import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@contexts/WixContext";

type CartState = {
  cart: currentCart.Cart | null;
  cartLength: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, productId: string) => void;
  clearCart: (wixClient: WixClient) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  cartLength: 0,
  bears: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || null,
        cartLength: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set({ cart: null, cartLength: 0 });
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    try {
      const res = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
              catalogItemId: productId,
              ...([variantId] && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });

      set({ cart: res.cart, cartLength: res.cart?.lineItems.length });
    } catch (err) {
      console.error(err);
    }
  },
  removeItem: async (wixClient, productId) => {
    try {
      const res = await wixClient.currentCart.removeLineItemsFromCurrentCart([
        productId,
      ]);

      set({ cart: res.cart, cartLength: res.cart?.lineItems.length });
    } catch (err) {
      console.error(err);
    }
  },
  clearCart: async (wixClient) => {
    try {
      const res = await wixClient.currentCart.deleteCurrentCart();
      set({ cart: null, cartLength: 0 });
    } catch (err) {
      console.error(err);
    }
  },
}));
