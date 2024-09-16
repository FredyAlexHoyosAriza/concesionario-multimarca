import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  },
  {
    marca: "Chevrolet",
    version: "Onix",
    modelo: 2012,
    color: "rojo",
  },
];

const ManageVehicles = () => {
  const [showTable, setShowTable] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  // const [coloresBoton, setColoresBoton] = useState("bg-indigo-700 text-white");

  useEffect(() => {
    /* Obtener lista de vehículos desde el backend, que le entraga un archivo JSON, que es
    asignado a un estado, y por ello podemos trabajar como queramos con esta información*/
    setVehiculos(vehicles);
  }, []);

  const saveVehiculo = (nuevoVehiculo) => {
    setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]);
    setShowTable(true);
    toast.success("🦄 Registro guaradado con exito!!!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="flex-grow mt-4 mx-4 flex flex-col items-center">
      <div className="flex flex-col w-full lg:flex-row mb-8 pb-8 border-b-4 border-green-950">
        <h2 className="mx-auto lg:translate-x-20 text-3xl text-center font-bold text-slate-950">
          Administración de vehículos
        </h2>
        <button
          onClick={() => setShowTable((prevShowTable) => !prevShowTable)}
          className={`rounded border-2 p-2 text-xl text-white bg-${
            showTable ? "indigo" : "green"
          }-700`}
        >
          {showTable ? "Crear vehículo" : "Tabla vehículos"}
        </button>
      </div>
      {showTable ? (
        <VehicleTable listaVehiculos={vehiculos} />
      ) : (
        <AddDBVVehicle infoNuevoVehiculo={saveVehiculo} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
    <div className="flex-grow text-xl text-gray-900">
      <legend className="text-center font-extrabold my-2">
        Todos los vehículos
      </legend>
      <table className="min-w-96">
        <thead>
          <tr>
            <th> Marca </th>
            <th> Versión </th>
            <th> Modelo </th>
            <th> Color </th>
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

const AddDBVVehicle = ({ infoNuevoVehiculo }) => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [version, setVersion] = useState("");
  const [color, setColor] = useState("");

  return (
    <form action="" className="text-xl lg:w-2/5">
      <legend className="font-bold my-2 text-center">
        Formulario de creacion de vehículo
      </legend>
      <fieldset>
        <label htmlFor="marca" className="block">
          <span className="inline-block pl-2">Marca: </span>
          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            id="marca"
            name="marca"
            className="w-full mt-1 min-h-2 rounded-lg"
            required
          >
            <option value="" disabled selected>
              Seleccione una marca
            </option>
            <option>BMW</option>
            <option>Chevrolet</option>
            <option>Ferrari</option>
            <option>Ford</option>
            <option>lamborgini</option>
            <option>Mazda</option>
            <option>Mustang</option>
            <option>Renault</option>
            <option>Tesla</option>
            <option>Toyota</option>
          </select>
        </label>
        <label htmlFor="modelo" className="block">
          <span className="inline-block pl-2">Modelo: </span>
          <input
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            id="modelo"
            name="modelo"
            type="number"
            min={1992}
            max={2025}
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="2024"
            required
          />
        </label>
        <label htmlFor="version" className="block">
          <span className="inline-block pl-2">Versión: </span>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            id="version"
            name="version"
            type="text"
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="GT Fastback"
            required
          />
        </label>
        <label htmlFor="color" className="block">
          <span className="inline-block pl-2">Color: </span>
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            id="color"
            name="color"
            type="text"
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="Orange"
            required
          />
        </label>
        <button
          onClick={() => infoNuevoVehiculo({
            marca: marca,
            modelo: modelo,
            version: version,
            color: color,
          })}
          type="button"
          className="w-full mt-4 min-h-2 rounded-lg border-slate-800 p-2 bg-green-700 text-white"
        >
          Guardar vehículo
        </button>
      </fieldset>
    </form>
  );
};

export default ManageVehicles;
