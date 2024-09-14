import React, { useState, useEffect } from "react";

const vehicles = [
  {
    marca: "Toyota",
    version: "Sequoia",
    modelo: 2025,
    color: "azul",
  },
  {
    marca: "Toyota",
    version: "Corolla",
    modelo: 2023,
    color: "griz",
  },
  {
    marca: "Ford",
    version: "Fiesta",
    modelo: 2017,
    color: "blanco",
  },
  {
    marca: "Renault",
    version: "Sandero",
    modelo: 2024,
    color: "rojo",
  },
  {
    marca: "Renault",
    version: "4",
    modelo: 1970,
    color: "rojo",
  },
  {
    marca: "Renault",
    version: "12",
    modelo: 1980,
    color: "rojo",
  },
  {
    marca: "Mazda",
    version: "3",
    modelo: 2010,
    color: "rojo",
  },
  {
    marca: "Chevrolet",
    version: "Caminos",
    modelo: 2014,
    color: "rojo",
  },  {
    marca: "Chevrolet",
    version: "Onix",
    modelo: 2012,
    color: "rojo",
  },
];

const ManageVehicles = () => {
  const [showTable, setShowTable] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  const [coloresBoton, setColoresBoton] = useState('bg-indigo-700 text-white');

  useEffect(() => {
    /* Obtener lista de vehículos desde el backend, que le entraga un archivo JSON, que es
    asignado a un estado, y por ello podemos trabajar como queramos con esta información*/
    setVehiculos(vehicles);
  }, []);

  useEffect(() => {
    if (showTable) {
      setColoresBoton('bg-indigo-700 text-white')
    } else {
      setColoresBoton('bg-green-700 text-gray-50')      
    }  
  }, [showTable])
  

  return (
    <div className="flex-grow mt-4 mx-4 flex flex-col items-center">
      <div className="flex flex-col w-full lg:flex-row mb-8 pb-8 border-b-4 border-green-950">
        <h2 className="mx-auto lg:translate-x-20 text-3xl text-center font-bold text-slate-950">
          Administración de vehículos
        </h2>
        <button
          onClick={() => setShowTable(!showTable)}
          className={`rounded border-2 p-2 text-xl ${showTable?'bg-indigo-700 text-white':'bg-green-700 text-gray-50'}`}
        >
          {showTable ? "Crear vehículo" : "Tabla vehículos"}
        </button>
      </div>
      {showTable ? (
        <VehicleTable listaVehiculos={vehiculos} />
      ) : (
        <AddDBVVehicle />
      )}
    </div>
  );
};

const VehicleTable = ({ listaVehiculos }) => {
  useEffect(() => {
    console.log(
      "Esta es la lista de vehiculos que llega a la tabla: ",
      listaVehiculos
    );
  }, [listaVehiculos]);

  return (
    <div className="text-xl text-gray-900">
      <legend className="text-center font-extrabold my-2">Todos los vehículos</legend>
      <table>
        <thead>
          <tr>
            <th>    Marca      </th>
            <th>    Versión    </th>
            <th>    Modelo     </th>
            <th>    Color      </th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map(({ marca, version, modelo, color }) => {
            return (
              <tr>
                <td>{marca}</td>
                <td>{version}</td>
                <td>{modelo}</td>
                <td>{color}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const AddDBVVehicle = () => {
  return (
    <form action="" className="text-xl text-center">
      <legend className="font-bold my-2">
        Formulario de creacion de vehículo
      </legend>
      <fieldset className="grid grid-cols-2">
        <input type="text" className="m-1" placeholder="Marca" />
        <input type="text" className="m-1" placeholder="Modelo" />
        <input type="text" className="m-1" placeholder="Versión" />
        <input type="text" className="m-1" placeholder="Color" />
        <button
          type="submit"
          className="col-span-2 border border-slate-800 rounded-lg mt-2 p-2 bg-green-700 text-white"
        >
          Guardar vehículo
        </button>
      </fieldset>
    </form>
  );
};

export default ManageVehicles;
