import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import { setSession } from '../utils/jwt';

import { LoginUser } from '../_apis_/auth';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOADING: (state, action) => {
    const { loading } = action.payload;
    return {
      ...state,
      isLoading: loading,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialize = async () => {
    try {
      const possapUser = window.localStorage.getItem('possap-user');
      if (possapUser) {
        setSession(JSON.stringify(possapUser));
        // const response = await axios.get('/api/account/my-account');
        // const response = await FetchUser();
        // const { user } = response.data;
        const user = JSON.parse(localStorage.getItem('possap-user'));

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user
          }
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  const login = async (email, password) => {

    try {
      const response = await LoginUser({
        UserName: email,
        Password: password
      });
      const {data}= response;
 
      if(data.Error){
        return data
  
      }else{
        data.ResponseObject.userType = 'Officer';
        localStorage.setItem('possap-user', JSON.stringify(data.ResponseObject));
        setSession(JSON.stringify(data));
        dispatch({
          type: 'LOGIN',
          payload: {
            user: data
          }
        });
        return data
      
      }
    } catch (error) {
      console.log(error);
      return error
    }

    // initialize();
  };



  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };
  const handleLoading = async (loading) => {
    setSession(null);
    dispatch({ type: 'LOADING', payload: {loading} });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        resetPassword,
        handleLoading,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
