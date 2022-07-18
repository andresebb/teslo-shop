import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import {
  useSession,
  signOut
} from 'next-auth/react';


import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';

import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser
}
const AUTH_INITIALSTATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC = ({ children }) => {

  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIALSTATE);
  const router = useRouter();

  // console.log({ router })

  useEffect(() => {
    if (status === 'authenticated') {
      console.log({ user: data?.user });
      dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
    }

  }, [status, data])


  // We dont need our token anymore, due we are working with nextauth
  // useEffect(() => {
  //   checkToken();
  // }, [])


  const checkToken = async () => {

    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: "[Auth] - Login", payload: user })
      return true;
    } catch {
      return false;
    }
  }

  const logoutUser = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');


    signOut();
    // Cookies.remove('token');
    // router.reload();
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError
        return {
          hasError: true,
          message: error.message
        };
      }

      return {
        hasError: true,
        message: 'Error registering user. Please try again.'
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      logoutUser,
      registerUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}