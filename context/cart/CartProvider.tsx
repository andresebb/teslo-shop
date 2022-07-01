import { FC, useEffect, useReducer } from 'react';

import Cookie from "js-cookie"

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

  //Read cookies
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
    }
  }, []);



  //Update cookies
  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart))
  }, [state.cart])

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