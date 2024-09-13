import React, { useState, useEffect } from "react";

/*Con el proposito de aprender se crea un formulario que le pide al usuario su edad
 y le indica si es mayor de edad */
const ManageClients = () => {
  const [edad, setEdad] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [color, setColor] = useState("");

  const saberSiYaEsMayor = () => {
    let color = 'text-amber-800';
    let message = "Se desconoce su edad";
    if (edad === null) {
    } else {
      if (edad < 18) {
        message = "Usted aún no es mayor de edad";
        color = 'text-red-600';
      } else {
        message = "Usted ya es mayor de edad";
        color = 'text-violet-800';
      }
    }
    setMensaje(message);
    setColor(color);
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
        <p className={`text-center text-3xl ${color}`}>{mensaje}</p>
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
