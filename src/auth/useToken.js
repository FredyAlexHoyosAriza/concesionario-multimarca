import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";

const useToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función que renueva el token utilizando el contexto de Auth0
  const refreshToken = useCallback(async () => {
    try {
      const newAccessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: "http://api-concesionario/",
          // scope: "read:current_user",
        },
      });
      localStorage.setItem("token", newAccessToken);
      return newAccessToken;
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }, [getAccessTokenSilently]);

  // Verifica el token y lo renueva si es necesario
  const verifyAndGetToken = useCallback(async () => {
    let storedToken = localStorage.getItem("token");

    if (!storedToken) {
      return await refreshToken();
    }

    try {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime - 3600) {
        console.error("Token has expired");
        return await refreshToken();
      }

      return storedToken;
    } catch (error) {
      console.error("Invalid token", error);
      return await refreshToken();
    }
  }, [refreshToken]);

  return verifyAndGetToken; // Devuelve directamente la función
};

export default useToken;
