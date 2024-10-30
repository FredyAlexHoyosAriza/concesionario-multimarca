import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";
import { updateRecs } from "utils/api";

const useToken = () => {
  const { getAccessTokenSilently } = useAuth0();//, getIdTokenClaims

  // Función que renueva el token utilizando el contexto de Auth0
  const refreshToken = useCallback(async () => {
    try {
      const newAccessToken = await getAccessTokenSilently({
        ignoreCache: true,
        authorizationParams: {
          audience: "http://api-concesionario/",
          // scope: "read:current_user", //scope: "openid", // Asegura que se incluya el ID Token
        },
      });
      //-----------------------------------------
      // Obtener ID Token
      // const idTokenClaims = await getIdTokenClaims();
      // const idToken = idTokenClaims?.__raw; // __raw contiene el ID Token en formato JWT

      console.log("Access Token:", newAccessToken);
      // console.log("ID Token:", idToken);
      //-----------------------------------------
      localStorage.setItem("token", newAccessToken);
      //Se hace query al back para actualizar y guardar, sino existe, la userInfo en el token
      await updateRecs(
        "usuarios/self",
        (response) => console.log(response.data),
        (error) => console.error(error)
      );
      //---------------------------------------------------------------------------------
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
        console.error("Token has expired, getting new one");
        return await refreshToken();
      }

      return storedToken;
    } catch (error) {
      console.error("Invalid token, getting new one", error);
      return await refreshToken();
    }
  }, [refreshToken]);

  return verifyAndGetToken; // Devuelve directamente la función
};

export default useToken;
