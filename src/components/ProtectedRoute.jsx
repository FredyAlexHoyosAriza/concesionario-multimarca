import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import useToken from "auth/useToken";
import Loading from "./Loading";
import { useUser } from "context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0(); //, loginWithRedirect
  // En tanto el user no este autenticado isLoading es true
  const { verifyAndGetToken } = useToken();
  /* En tanto no se haya verificado el token y obtenido el usuario del back, se tendrá userData=''
  luego de esto el contexto userData recibe la info del usuario que inicia seseión*/
  const { userData } = useUser();

  useEffect(() => {
    // Caso en el que el inicio de la app sería el form de login auth0
    // if (isAuthenticated) (async () => await verifyAndGetToken())();
    // else if (!isLoading) loginWithRedirect();

    // Cada vez que cambie isLoading o isAuthenticated y este último sea true se solicita un nuevo token
    if (isAuthenticated) (async () => await verifyAndGetToken())();
    else if (!isLoading) navigate("/");
  }, [isLoading, isAuthenticated, navigate, verifyAndGetToken]); //, loginWithRedirect

  if (isLoading || !userData) {
    return (
      <div className="bg-slate-900 w-screen h-screen grid place-items-center">
        <Loading />
      </div>
    );
  }

  return isAuthenticated && children;
};

export default ProtectedRoute;
