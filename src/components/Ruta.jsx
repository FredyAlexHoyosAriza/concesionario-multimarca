import React from "react";
import { Link } from "react-router-dom";

const Ruta = ({ ruta, icono }) => {
  return (
    <li>
      <Link to={`/admin/${ruta}`}>
        <i className={`fas fa-${icono} mr-2`} />
        {`Manage ${ruta}`}
      </Link>
    </li>
  );
};

export default Ruta;
