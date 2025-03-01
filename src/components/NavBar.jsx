import React from "react";
import { Link } from "react-router-dom";
import concessionaireLogo from "media/concesionario-de-coches.png";
import { useAuth0 } from "@auth0/auth0-react";

/*Nota: la recomendacion para un NavBar usamos una etiqueta nav dentro de la cual va una
etiqueta ul y dentro tantos li como sean necesarios. my-3 => margin: 3rem 0; 1=0.25rem*/
const NavBar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    //  hover:cursor-pointer hover:scale-125
    <nav className="bg-violet-300">
      <ul className="flex justify-between items-center my-4 px-4">
        <li>
          <Link to={"/"}>
            <img
              src={concessionaireLogo}
              alt="Img Concesionario"
              className="ml-2 w-14 h-auto hover:cursor-pointer hover:scale-125"
            />
          </Link>
        </li>
        <li>Mazda</li>
        <li>Renault</li>
        <li>Toyota</li>
        <li>Honda</li>
        <li className="p-2">
          {/* <Link to={"/login"}> */}
          <button
            onClick={() => loginWithRedirect()}
            className="m-1 bg-indigo-500 p-2 border border-x-sky-900 text-white rounded-lg shadow-gray-400 hover:scale-110 hover:bg-indigo-900"
          >
            Login
          </button>
          {/* </Link> */}
          <div className="hidden">
            <Link to={"/register"}>
              <button className=" bg-green-600 p-2 border border-x-lime-950 text-white rounded-lg shadow-gray-400 hover:scale-110 hover:bg-indigo-900">
                Register
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
