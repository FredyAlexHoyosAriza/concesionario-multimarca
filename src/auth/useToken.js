import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecs } from "utils/api";
import { useUser } from "context/UserProvider";

const useToken = () => {
  const { getAccessTokenSilently, logout } = useAuth0(); //, getIdTokenClaims
  const { setUserData } = useUser();

  const handleLogout = useCallback(
    (error) => {
      //No acepta un token válido p. ej. si el back está apagado
      console.error(error);
      logout({ logoutParams: { returnTo: window.location.origin } });
      localStorage.setItem("token", "");
      setUserData("");
    },
    [logout, setUserData]
  );

  // Función que renueva el token utilizando el contexto de Auth0
  const refreshToken = useCallback(async () => {
    try {
      const newAccessToken = await getAccessTokenSilently({
        ignoreCache: true, //cacheMode: 'off',
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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
      //Se hace query al back para actualizar o crear, registro con userInfo en DB
      await getRecs(
        "usuarios/self",
        (response) => {
          console.log(response.data);
          // setUserData(response.data);
          setUserData(jwtDecode(newAccessToken)["http://localhost/userInfo"]);
        },
        handleLogout
      );
      //---------------------------------------------------------------------------------
      return newAccessToken;
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }, [getAccessTokenSilently, setUserData, handleLogout]);

  // Verifica el token y lo renueva si es necesario
  const verifyAndGetToken = useCallback(async () => {
    let storedToken = localStorage.getItem("token");

    if (!storedToken) {
      return await refreshToken();
    }

    try {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      const expirationBuffer = Number(process.env.REACT_APP_TOKEN_EXPIRATION_BUFFER) || 60;

      // Se verifica 60 segundos antes de expirar
      //     00:59:01 + 00:01:00 > 01:00:00 -> true
      //     01:00:01            > 01:00:00 -> true
      if (currentTime + expirationBuffer > decodedToken.exp) {
        console.warn(
          "Token is close to expiring or has expired, refreshing..."
        );
        return await refreshToken();
      }

      /*Solo se requeriría si un usuario admin realiza modificación sobre su cuenta propia de
      usuario, no sierra sesión y se reconecta antes de vencer el token en 24 horas */
      // const urlPart = `usuarios/${
      //   decodedToken["http://localhost/userInfo"].user_id
      // }`;
      await getRecs(
        "usuarios/me",
        (response) => setUserData(response.data),
        handleLogout
      );

      // await getRecs(
      //   "usuarios/self",
      //   (response) => {
      //     console.log(response.data);
      //     setUserData(response.data);
      //     // setUserData(decodedToken["http://localhost/userInfo"]);
      //   },
      //   (error) => console.error(error)
      // );
      return storedToken;
    } catch (error) {
      console.error("Invalid token, getting new one", error);
      return await refreshToken();
    }
  }, [refreshToken, setUserData, handleLogout]);

  return { verifyAndGetToken, refreshToken }; // Devuelve directamente la función
};

export default useToken;
