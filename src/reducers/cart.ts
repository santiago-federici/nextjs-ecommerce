import { State, Action } from "@interfaces/cart";

export const initialState: State = {
  cart: [],
};

const updateToLocalStorage = (cart: any /* TODO fix type */) => {
  // if (typeof window === "undefined") {
  localStorage.setItem("cart", JSON.stringify(cart));
  // }
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  if (type === "INITIALIZE_CART") {
    return { ...state, cart: payload!.cart!, success: "Cart initialized" };
  }

  if (type === "INCREASE_QUANTITY") {
    const { id, stock } = payload!;
    const { cart } = state;

    const indexOfProduct = cart.findIndex((item) => item.productId === id);

    if (indexOfProduct >= 0) {
      if (cart[indexOfProduct].quantity < stock!) {
        const newState = structuredClone(cart);
        newState[indexOfProduct].quantity += 1;
        updateToLocalStorage(newState);
        return { update: "Product quantity updated", cart: newState };
      }

      return { warning: "Stock limit reached", cart };
    }

    if (stock! > 0) {
      const newState = [
        ...cart,
        {
          productId: id as number,
          quantity: 1,
        },
      ];
      updateToLocalStorage(newState);
      return { success: "Added to cart", cart: newState };
    }

    return { error: "This product is out of stock", cart };
  }

  if (type === "DECREASE_QUANTITY") {
    const { id } = payload!;
    const { cart } = state;

    const indexOfProduct = cart.findIndex((item) => item.productId === id);
    if (indexOfProduct >= 0) {
      const newState = structuredClone(cart);

      if (newState[indexOfProduct].quantity > 1) {
        newState[indexOfProduct].quantity -= 1;
        updateToLocalStorage(newState);
        return { update: "Product quantity updated", cart: newState };
      }

      if (cart[indexOfProduct].quantity === 1) {
        const newState = cart.filter((item) => item.productId !== id);
        updateToLocalStorage(newState);
        return { success: "Product removed from cart", cart: newState };
      }
    }

    return { error: "Failed to decrease quantity", cart };
  }

  if (type === "REMOVE_FROM_CART") {
    const { id } = payload!;
    const { cart } = state;

    const newState = cart.filter((item) => item.productId !== id);
    updateToLocalStorage(newState);
    return { success: "Product removed from cart", cart: newState };
  }

  if (type === "CLEAR_CART") {
    updateToLocalStorage(initialState.cart);
    return { success: "Cart cleared", cart: initialState.cart };
  }

  return { error: "Method not allowed", cart: state.cart };
};
