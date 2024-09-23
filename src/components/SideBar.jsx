import { useTheme } from "context/ThemeProvider";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoConcesionario from "./LogoConcesionario";
import useActiveRoute from "./hooks/useActiveRoute";

const SideBar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  // const [seleccion, setSeleccion] = useState([true, false, false, false, false]);
  // onClick={() => setSeleccion([true, false, false, false, false])}
  return (
    //w-72: la mitad de una pantalla mediana
    <nav className={`menu side-bar ${theme ? "menu--light" : "menu--dark"}`}>
      <ul className="menu__list">
        <Link
          to={"/admin"}
          className={`${"/admin" === pathname && "current-path"}`}
        >
          <LogoConcesionario />
        </Link>
        <Ruta ruta="profile" icono="user" />
        <Ruta ruta="clients" icono="users" />
        <Ruta ruta="vehicles" icono="car" />
        <Ruta ruta="sales" icono="cash-register" />
        <button
          className={`menu__button ${
            theme ? "menu__button--light" : "menu__button--dark"
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

const Ruta = ({ ruta, icono }) => {
  const isActive = useActiveRoute(ruta);
  //${`/admin/${ruta}` === pathname && 'current-path' }
  return (
    <Link
      to={`/admin/${ruta}`}
      className={`${isActive && "current-path"}`}
    >
      <i className={`fas fa-${icono} mr-2`} />
      {`Manage ${ruta}`}
    </Link>
  );
};

export default SideBar;
