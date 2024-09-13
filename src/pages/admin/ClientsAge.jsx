import React, { useState, useEffect } from "react";

const ClientsAge = () => {
  const [edad, setEdad] = useState("");
  const [esMayor, setEsMayor] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (edad < 18) {
      setEsMayor(false);
    } else {
      setEsMayor(true);
    }
  }, [edad]);

//   const alternar = () => {
//     if (mostrar) {
//       setMostrar(false);
//     } else {
//       setMostrar(true);
//     }
//   };

  return (
    <div>
      <form action="" className="flex flex-col text-3xl">
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
        {edad !== "" ? (
          esMayor ? (
            <p className="text-green-800">
              Ya eres mayor de edad y por ello puedes votar
            </p>
          ) : (
            <p className="text-red-800">
              Aún no eres mayor de edad y por ello No puedes votar
            </p>
          )
        ) : (
          <p className="text-amber-800">
            Ingresa tu edad para determinar si puedes votar
          </p>
        )}
        <button
          onClick={() => setMostrar(!mostrar)}
          type="button"
          className="border border-slate-800"
        >
          Mostrar Desaparecer
        </button>
        {mostrar && (
          <>
            <span className="bg-blue-600 text-center">Soy un span de color azul</span>
            <span className="bg-blue-600 text-center">Soy un span de color azul</span>
            <span className="bg-blue-600 text-center">Soy un span de color azul</span>
            <span className="bg-blue-600 text-center">Soy un span de color azul</span>
            <span className="bg-blue-600 text-center">Soy un span de color azul</span>
          </>
        )}
      </form>
    </div>
  );
};

export default ClientsAge;
