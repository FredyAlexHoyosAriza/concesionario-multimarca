import { useTheme } from "context/ThemeProvider";
import React from "react";
import { Link } from "react-router-dom";
import Ruta from "./Ruta";
import LogoConcesionario from "./LogoConcesionario";

const NavMenu = ({menuStyle}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav
      className={`${menuStyle} ${theme ? 'menu--light' : 'menu--dark'}`}
    >
      <ul className={`${menuStyle}__list menu__list`}>
        <Link to={"/admin"}>
          <LogoConcesionario />
        </Link>
        <Ruta ruta="profile" icono="user" />
        <Ruta ruta="clients" icono="users" />
        <Ruta ruta="vehicles" icono="car" />
        <Ruta ruta="sales" icono="cash-register" />
        <button
          className={`menu__button ${menuStyle}__button ${
            theme ? 'menu__button--light' : 'menu__button--dark'
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

export default NavMenu;
