import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  // En tanto el user no este autenticado isLoading es true

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/');
  
  }, [isLoading, isAuthenticated, navigate])
  
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return  isAuthenticated && children
};

export default PrivateRoute;
