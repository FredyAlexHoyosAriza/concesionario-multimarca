import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  // En tanto el user no este autenticado isLoading es true

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/');

    const getAccessToken = async () => {
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'http://api-concesionario/',//el mismo del backend; id de api de auth0
            scope: "read:current_user",
          },
        });
        //Se almacena el token de auth0 en el localStorage que solo tiene alcance (scope) para la app
        localStorage.setItem('token', accessToken );
  
      } catch (e) {
        console.log(e.message);
      }
    };

    // Cada vez que cambie isLoading o isAuthenticated y este último sea true se solicita un nuevo token
    if (isAuthenticated) getAccessToken();
  
  }, [isLoading, isAuthenticated, navigate, getAccessTokenSilently])
  
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return  isAuthenticated && children
};

export default PrivateRoute;
