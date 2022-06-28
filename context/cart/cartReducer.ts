import { ICartProduct } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType =
  | { type: "[Cart] - loadCart from cookies"; payload: ICartProduct[] }
  | { type: "[Cart] - Add Product"; payload: ICartProduct };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - loadCart from cookies":
      return {
        ...state,
      };
      break;
    case "[Cart] - Add Product": {
      return {
        ...state,
        cart: [action.payload],
      };
    }
    default:
      return state;
  }
};
