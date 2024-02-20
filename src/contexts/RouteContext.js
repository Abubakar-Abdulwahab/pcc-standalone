// RouteContext.js
import React, { createContext, useContext, useReducer } from 'react';

const RouteContext = createContext();

export const useRouteContext = () => useContext(RouteContext);
const currentPath = localStorage.getItem('path') || '/'
const initialState = {
  currentRoute: currentPath,
  data: null
};

const routeReducer = (state, action) => {
  switch (action.type) {
    case 'NAVIGATE':
      localStorage.setItem('path', action.payload)
      return { ...state, currentRoute: action.payload };
    case 'NAVIGATE-WITH-DATA':
      localStorage.setItem('path', action.payload.path)
      return { ...state, currentRoute: action.payload.path, data: action.payload.data };
    default:
      return state;
  }
};

export const RouteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routeReducer, initialState);

  return (
    <RouteContext.Provider value={{ state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
};
