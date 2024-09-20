import React, { useState } from "react";
import NavMenu from "./NavMenu";

const SideBar = () => {
  // const [seleccion, setSeleccion] = useState([true, false, false, false, false]);
  // onClick={() => setSeleccion([true, false, false, false, false])}
  return (
    //w-72: la mitad de una pantalla mediana
    <>
      <NavMenu menuStyle='menu-md' />
    </>
  );
};

export default SideBar;
