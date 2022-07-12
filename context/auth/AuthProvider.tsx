import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import { tesloApi } from '../../api';
import axios, { AxiosError } from 'axios';
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

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIALSTATE);
  const router = useRouter();


  useEffect(() => {
    checkToken();
  }, [])


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
    Cookies.remove('token');
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    router.reload();
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