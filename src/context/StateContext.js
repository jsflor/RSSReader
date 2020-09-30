import React, {createContext, useContext, useReducer} from 'react';
import mainReducer from './reducers';

export const StateContext = createContext();

const initialState = {
  news: undefined,
};

export const StateProvider = ({children}) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
