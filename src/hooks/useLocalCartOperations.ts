import { useReducer } from "react";
import { State, Action, CartItem } from "@interfaces/cart";
import { initialState, reducer } from "@reducers/cart";

export function useLocalCartOperations(initialCart: CartItem[] | null) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    ...initialState,
    cart: initialCart || [],
  });

  const initializeCart = (cart: CartItem[]) => {
    dispatch({
      type: "INITIALIZE_CART",
      payload: { cart },
    });
  };

  const increaseQuantityLocal = (id: number, stock: number) =>
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: { id, stock },
    });

  const decreaseQuantityLocal = (id: number) =>
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: { id },
    });

  const removeProdLocal = (id: number) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });

  const clearCartLocal = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return {
    state,
    initializeCart,
    increaseQuantityLocal,
    decreaseQuantityLocal,
    removeProdLocal,
    clearCartLocal,
  };
}
