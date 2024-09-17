import { useTheme } from "context/ThemeProvider";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    //w-72: la mitad de una pantalla mediana
<nav className={`menu ${theme ? 'menu--light' : 'menu--dark'}`}>
  <ul className="menu__list">
    <li className="menu__item">
      <button
        className={`menu__button ${theme ? 'menu__button--light' : 'menu__button--dark'}`}
        type="button"
        onClick={toggleTheme}
          >Alternar tema</button>
        </li>
        <li>
          <Link to={"/admin/vehicles"}>Gestionar vehiculos</Link>
        </li>
        <li>
          <Link to={"/admin/clients"}>Gestionar clientes</Link>
        </li>
        <li>
          <Link to={"/admin"}>Inicio panel administración</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
