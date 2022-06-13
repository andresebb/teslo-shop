import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';

import { CartContext, cartReducer } from './';

export interface CartState {
  cart: ICartProduct[];
}
const CART_INITIALSTATE: CartState = {
  cart: []
}

export const CartProvider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIALSTATE)

  const addProductToCart = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Add Product', payload: product });
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}