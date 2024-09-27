import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleTable from "./VehicleTable";
import AddDBVehicle from "./AddDBVehicle";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const vehicles = [
  {
    marca: "Toyota",
    gama: "Sequoia",
    modelo: 2025,
    color: "azul",
  },
  {
    marca: "Toyota",
    gama: "Corolla",
    modelo: 2023,
    color: "griz",
  },
  {
    marca: "Ford",
    gama: "Fiesta",
    modelo: 2017,
    color: "blanco",
  },
  {
    marca: "Renault",
    gama: "Sandero",
    modelo: 2024,
    color: "rojo",
  },
  {
    marca: "Renault",
    gama: "4",
    modelo: 1970,
    color: "rojo",
  },
  {
    marca: "Renault",
    gama: "12",
    modelo: 1980,
    color: "rojo",
  },
  {
    marca: "Mazda",
    gama: "3",
    modelo: 2010,
    color: "rojo",
  },
  {
    marca: "Chevrolet",
    gama: "Caminos",
    modelo: 2014,
    color: "rojo",
  },
  {
    marca: "Chevrolet",
    gama: "Onix",
    modelo: 2012,
    color: "rojo",
  },
];

const ManageVehicles = () => {
  const [showTable, setShowTable] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  const [getVehicles, setGetVehicles] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/admin/vehicles/create") {
      setShowTable(false);
    }
    // updateTable();
    setVehiculos(vehicles);
  }, [getVehicles]);

  const updateTable = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:3000/vehicle/get-all/",
    };
    await axios
      .request(options)
      .then(function (response) {
        setVehiculos(response.data);
        toast.success("Tabla actualizada con exito!!!");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("La tabla no pudo ser actualizada");
      });
  };

  const saveVehiculo = (nuevoVehiculo) => {
    setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]); //CREATE
    // setGetVehicles((prevGetVehicles) => !prevGetVehicles); //solo si exitoso
    setShowTable(true);
    toast.success("Registro guardado con exito!!!");
  };

  return (
    <div className="flex-grow mt-4 sm:mx-4 flex flex-col items-center">
      <div className="flex flex-col w-fit lg:w-full lg:flex-row mb-8 pb-8 border-b-4 border-green-950">
        <h2 className="mx-auto lg:translate-x-20 text-xl sm:text-3xl text-center font-bold text-slate-950">
          Administración de vehículos
        </h2>
        <button
          onClick={() => setShowTable((prevShowTable) => !prevShowTable)}
          className={`rounded border-2 p-2 text-xl text-white ${
            showTable ? "bg-indigo-700" : "bg-green-700"
          }`}
        >
          {showTable ? (
            <Link to={"create"}>Crear vehículo</Link>
          ) : (
            <Link to={""}>Tabla vehículos</Link>
          )}
        </button>
      </div>
      {showTable ? (
        <VehicleTable
          listaVehiculos={vehiculos}
          setGetVehicles={setGetVehicles}
        />
      ) : (
        <AddDBVehicle infoNuevoVehiculo={saveVehiculo} />
      )}
      <ToastContainer
        /*🦄*/ position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ManageVehicles;
