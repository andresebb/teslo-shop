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
    const productInCart = state.cart.some(p => p._id === product._id);
    if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    // Acumular
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Update Quantity
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
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