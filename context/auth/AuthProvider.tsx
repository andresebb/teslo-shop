import { FC, useReducer } from 'react';
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

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIALSTATE)

  return (
    <AuthContext.Provider value={{
      ...state
    }}>
      {children}
    </AuthContext.Provider>
  )
}