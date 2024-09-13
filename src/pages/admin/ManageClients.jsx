import React, { useState, useEffect } from "react";

/*Con el proposito de aprender se crea un formulario que le pide al usuario su edad
 y le indica si es mayor de edad */
const ManageClients = () => {
  const [edad, setEdad] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const saberSiYaEsMayor = () => {
    let message = "Se desconoce su edad";
    if (edad === null) {
    } else {
      message = "Usted aún no es mayor de edad";
      if (edad < 18) {
      } else {
        message = "Usted ya es mayor de edad";
      }
    }
    setMensaje(message);
    console.log(message);
  };

  return (
    <div>
      <form action="" className="flex flex-col">
        <legend className="text-center text-xl font-bold my-2">
          Formulario de creación de cliente
        </legend>
        <label htmlFor="edad">
          Ingrese se edad:{" "}
          <input
            id="edad"
            name="Edad"
            type="number"
            onChange={(e) => setEdad(e.target.value)}
          />
        </label>
        <p className="text-center">{mensaje}</p>
        <button
          onClick={saberSiYaEsMayor}
          type="button"
          className="border border-slate-800"
        >
          Saber si es mayor
        </button>
      </form>
    </div>
  );
};

export default ManageClients;
