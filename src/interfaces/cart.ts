export type CartItem = {
  productId: number;
  quantity: number;
};

export interface State {
  update?: string;
  success?: string;
  warning?: string;
  error?: string;
  cart: CartItem[];
}

export interface Action {
  type: string;
  payload?: {
    id?: number;
    stock?: number;
    quantity?: number;
    cart?: CartItem[];
  };
}
