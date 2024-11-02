import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import useToken from "auth/useToken";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  // En tanto el user no este autenticado isLoading es true
  const { verifyAndGetToken } = useToken();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/");

    // Cada vez que cambie isLoading o isAuthenticated y este último sea true se solicita un nuevo token
    if (isAuthenticated) (async () => await verifyAndGetToken())();
  }, [isLoading, isAuthenticated, navigate, verifyAndGetToken]);

  if (isLoading) {
    return (
      <div className="bg-slate-900 w-screen h-screen grid place-items-center">
        <Loading />
      </div>
    );
  }

  return isAuthenticated && children;
};

export default PrivateRoute;
