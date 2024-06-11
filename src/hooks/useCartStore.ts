import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@contexts/WixContext";

type CartState = {
  cart: currentCart.Cart;
  cartLength: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, productId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,
  bears: 0,
  getCart: async (wixClient) => {
    const cart = await wixClient.currentCart.getCurrentCart();
    set({
      cart: cart || [],
      cartLength: cart?.lineItems.length || 0,
    });
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
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
  },
  removeItem: async (wixClient, productId) => {
    const res = await wixClient.currentCart.removeLineItemsFromCurrentCart([
      productId,
    ]);

    set({ cart: res.cart, cartLength: res.cart?.lineItems.length });
  },
}));
