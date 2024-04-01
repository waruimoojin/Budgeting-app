import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Auth = ({ children }) => {
  // Access the context value
  const { isLoggedIn } = useContext(AuthContext);
  console.log("I can come herre", isLoggedIn)


  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in, render the child components
  return <>{children}</>;
};

export default Auth;
