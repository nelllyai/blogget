import React from 'react';
import {useAuth} from '../Hooks/useAuth';
import PropTypes from 'prop-types';

export const authContext = React.createContext({});

export const AuthContextProvider = ({children}) => {
  const [auth, clearAuth] = useAuth();

  return (
    <authContext.Provider value={{auth, clearAuth}}>
      {children}
    </authContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
