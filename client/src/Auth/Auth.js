import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Auth = ({ children }) => {

  const { isLoggedIn } = useContext(AuthContext);
  console.log("I can come herre", isLoggedIn)



  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return <>{children}</>;
};

export default Auth;
