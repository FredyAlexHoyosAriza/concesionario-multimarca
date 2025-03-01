import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleTable from "./VehicleTable";
import AddDbVehicle from "./AddDbVehicle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRecs, saveRec } from "utils/api";
import Loading from "components/Loading";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from "context/UserProvider";

const ManageVehicles = () => {
  const [showTable, setShowTable] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  const [getVehicles, setGetVehicles] = useState(false);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const urlPart = "vehiculos";
  const { userData } = useUser();
  const isAcceptedRole = ['admin'].includes(userData.role);//, 'seller'

  // success callback
  const gettedRecs = (response) => {
    setVehiculos(response.data);
    toast.success("Tabla actualizada con exito!!!");
  };

  // error callback
  const notGettedRecs = ({ response }) => {
    console.error(response.data);
    toast.error("La tabla no pudo ser actualizada");
  };

  useEffect(() => {
    if (pathname === "/admin/vehicles/create") {
      if (isAcceptedRole) setShowTable(false);
      else navigate("/admin/vehicles");
    }
    (async () => {
      // setIsLoading(true);
      await getRecs(urlPart, gettedRecs, notGettedRecs);
      setIsLoading(false);
    })();
  }, [getVehicles, pathname, isAcceptedRole, navigate]);

  // succes callback
  const savedVehicle = async (response) => {
    console.log(response.data);
    // await getRecs(urlPart, gettedRecs, notGettedRecs); //mejor esta alternativak
    navigate("/admin/vehicles");
    setGetVehicles((prevGetVehicles) => !prevGetVehicles); //alternativa
    setShowTable(true);
    toast.success("Registro guardado con exito!!!");
  };

  // error callback
  const notSavedVehicle = (error) => {
    console.error(error);
    toast.error(`Error al guardar registro: ${error.message}`);
  };
  //No requiere await ya se retorna una promesa; solo tiene un retorno; no hay operaciones
  //posteriores que deban esperar ni un valor al que asignar un hipotetico retorno de saveVehicle
  const saveVehiculo = async (nuevoVehiculo) =>
    saveRec(nuevoVehiculo, urlPart, savedVehicle, notSavedVehicle); //asincrona

  return (
    <div className="flex-grow mt-4 sm:mx-4 flex flex-col items-center">
      <div className="flex flex-col w-fit lg:w-full lg:flex-row mb-8 pb-8 border-b-4 border-green-950">
        <h2 className={`mx-auto ${isAcceptedRole && 'lg:translate-x-20'} text-xl sm:text-3xl text-center font-bold text-slate-950`}>
          Administración de vehículos
        </h2>
        <PrivateComponent>
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
        </PrivateComponent>
      </div>
      {showTable ? (
        isLoading ? (
          <div className="w-full h-full grid place-items-center">
            <Loading />
          </div>
        ) : (
          <VehicleTable
            listaVehiculos={vehiculos}
            setGetVehicles={setGetVehicles}
          />
        )
      ) : (
        <PrivateComponent>
          <AddDbVehicle infoNuevoVehiculo={saveVehiculo} />
        </PrivateComponent>
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
