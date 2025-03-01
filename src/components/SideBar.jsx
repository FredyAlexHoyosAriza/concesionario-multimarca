import { useTheme } from "context/ThemeProvider";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoConcesionario from "./LogoConcesionario";
import useActiveRoute from "./hooks/useActiveRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "context/UserProvider";
import PrivateComponent from "./PrivateComponent";

const SideBar = () => {
  const { pathname } = useLocation();
  const { isLight, toggleTheme } = useTheme();
  const { logout } = useAuth0();
  const { userData, setUserData } = useUser();
  // const [seleccion, setSeleccion] = useState([true, false, false, false, false]);
  // onClick={() => setSeleccion([true, false, false, false, false])}
  return (
    //w-72: la mitad de una pantalla mediana
    <nav className={`menu side-bar ${isLight ? "menu--light" : "menu--dark"}`}>
      <ul className="menu__list">
        <Link
          to={"/admin"}
          className={`${"/admin" === pathname && "current-path"}`}
        >
          <LogoConcesionario />
        </Link>
        <Ruta ruta="profile" icono="user" usuario={userData} />
        <PrivateComponent>
          <Ruta ruta="users" icono="users" />
        </PrivateComponent>
        <PrivateComponent roles={['seller', 'client']}>
          <Ruta ruta="vehicles" icono="car" />
        </PrivateComponent>
        <PrivateComponent roles={['seller']}>
          <Ruta ruta="clients" icono="mug-hot" />
          <Ruta ruta="sales" icono="cash-register" />
        </PrivateComponent>
        <button
          className={`menu__button ${
            isLight ? "menu__button--light" : "menu__button--dark"
          }`}
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
            localStorage.setItem("token", "");
            setUserData('');
          }}
        >
          Log Out
        </button>
        <button
          className={`menu__button ${
            isLight ? "menu__button--light" : "menu__button--dark"
          }`}
          type="button"
          onClick={toggleTheme}
        >
          Alternar tema
        </button>
      </ul>
    </nav>
  );
};

const Ruta = ({ ruta, icono, usuario }) => {
  const isActive = useActiveRoute(ruta);
  //${`/admin/${ruta}` === pathname && 'current-path' }
  return (
    <Link to={`/admin/${ruta}`} className={`${isActive && "current-path"}`}>
      {usuario ? (
        <>
          <img
            src={usuario.picture}
            alt="Usuario"
            className="w-5 h-5 rounded-full inline-block mr-1"
          />
          {usuario.name}
        </>
      ) : (
        <>
          <i className={`fas fa-${icono} mr-2`} />
          {`Manage ${ruta}`}
        </>
      )}
    </Link>
  );
};

export default SideBar;
