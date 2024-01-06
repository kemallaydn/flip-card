import React, { ReactNode, createContext, useContext, useReducer } from "react";
import authInitialState from './İnitialState/AuthState';

import auth from './Reducer/Auth';

export const GlobalContext = createContext({});
const Provider= ({ children }:any) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const value = {
        authState,
        authDispatch,

    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
export const context = () => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error('useFavori hook must be used within a FavoriProvider');
    }
    return context;
  };
export default Provider;