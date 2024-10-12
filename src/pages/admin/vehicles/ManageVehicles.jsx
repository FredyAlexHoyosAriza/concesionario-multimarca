import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleTable from "./VehicleTable";
import AddDBVehicle from "./AddDBVehicle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateTable, saveVehicle } from "utils/api";

const ManageVehicles = () => {
  const [showTable, setShowTable] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  const [getVehicles, setGetVehicles] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/admin/vehicles/create") {
      setShowTable(false);
    }
    updateTable(setVehiculos);
    // setVehiculos(vehicles);
  }, [getVehicles]);

  const saveVehiculo = (nuevoVehiculo) =>
    saveVehicle(nuevoVehiculo, setVehiculos, setShowTable, navigate);

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
