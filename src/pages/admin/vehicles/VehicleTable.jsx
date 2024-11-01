import { Dialog } from "@mui/material";//, Tooltip
import ScientificNotation from "components/ScientificNotation";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { editRec, deleteRec } from "utils/api";

const VehicleTable = ({ listaVehiculos, setGetVehicles }) => {
  const [busqueda, setBusqueda] = useState("");
  const [vehiculosBusqueda, setVehiculosBusqueda] = useState([
    ...listaVehiculos,
  ]);

  useEffect(() => {
    console.log(busqueda);
    if (busqueda !== "") {
      setVehiculosBusqueda(
        listaVehiculos.filter((vehiculo) => {
          return JSON.stringify(vehiculo)
            .toLowerCase()
            .includes(busqueda.toLowerCase());
        })
      );
    } else {
      setVehiculosBusqueda(listaVehiculos);
    }
  }, [busqueda, listaVehiculos]);

  return (
    <div className="w-full text-xl text-gray-900 tabla">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="rounded-lg block mx-auto border border-gray-700 px-4 py-2"
      />
      <legend className="text-center font-extrabold my-2">
        Todos los vehículos
      </legend>
      <div className="hidden sm:block">
        <table className="w-full min-w-96">
          <thead>
            <tr>
              <th> Marca </th>
              <th> Gama </th>
              <th> Modelo </th>
              <th> Color </th>
              <th> Precio </th>
              <th className="w-1/12"> Acciones </th>
            </tr>
          </thead>
          <tbody>
            {vehiculosBusqueda.map((vehiculo) => {
              //({ _id, marca, gama, modelo, color, precio })
              return (
                <VehicleRow
                  key={nanoid()}
                  vehicle={vehiculo}
                  setGetVehicles={setGetVehicles}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-around sm:hidden">
        {vehiculosBusqueda.map(({ marca, gama, modelo, color, precio }) => {
          //({ _id, marca, gama, modelo, color, precio }) // Cards para tamaños pequeños
          return (
            <div
              key={nanoid()}
              className="bg-slate-500 text-white p-2 m-2 rounded-lg flex flex-col"
            >
              <span>Marca: {marca} </span>
              <span>Gama: {gama} </span>
              <span>Modelo: {modelo} </span>
              <span>Color: {color} </span>
              <span>Precio: {precio} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VehicleRow = ({ vehicle, setGetVehicles }) => {
  const { _id, ...vehicleNoId } = vehicle;
  const urlPart = `vehiculos/${_id}`;
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [vehiculo, setVehiculo] = useState(vehicleNoId);
  const [opendDialogue, setOpenDialogue] = useState(false);
  const btnConfirmRef = useRef(null);
  const btnCancelRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      btnCancelRef.current.focus(); // Enfocar el botón derecho
    } else if (e.key === "ArrowLeft") {
      btnConfirmRef.current.focus(); // Enfocar el botón izquierdo
    }
  };

  const handleVehicle = (e) => {
    setVehiculo((prevVehiculo) => ({
      ...prevVehiculo,
      [e.target.name]: e.target.value,
    }));
  };

  //-------------------------------------------------

  // success callback
  const updatedVehicle = (response) => {
    setGetVehicles((prevGetVehicles) => !prevGetVehicles);
    setEditar(false);
    console.log(response.data);
    toast.success("Registro actualizado con exito!!!");
  };

  // error callback
  const notUpdatedVehicle = (error) => {
    console.error(error);
    toast.error("El Registro no pudo ser actualizado");
  };

  const handleEdit = async () => {
    setOpenDialogue(false);
    const { modelo, precio } = vehiculo;
    if (modelo < 1992 || modelo > 2025) {
      toast.warn("El modelo debe estar entre 1992 y 2025");
    }  else if (precio < 0) {    
      toast.warn("El precio debe ser mayor a 0");
    } else {
      await editRec(vehiculo, urlPart, updatedVehicle, notUpdatedVehicle);
    }
  };

  // const handleEdit = () => {
  //   setOpenDialogue(false);
  //   const { modelo } = vehiculo;
  //   if (modelo < 1992 || modelo > 2025) {
  //     toast.warn("El modelo debe estar entre 1992 y 2025");
  //   } else {
  //     console.log(vehiculo);
  //     setEditar(false);
  //   }
  //   //cada vez que cambia un registro se traen todos los registros desde DB y se renderiza la tabla
  //   //aquí aún no actualiza desde BD por ello se debe resetear el estado vehículo
  //   setVehiculo({ ...vehicle });
  // };
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // success callback
  const deletedVehicle = (response) => {
    setGetVehicles((prevGetVehicles) => !prevGetVehicles);
    setEliminar(false);
    console.log(response.data);
    toast.success("Registro eliminado con exito!!!");
  };
  
  // error callback
  const notDeletedVehicle = (error) => {
    console.error(error);
    toast.error("El Registro no pudo ser eliminado");
  };

  const handleDelete = async () => {
    setOpenDialogue(false);
    await deleteRec(urlPart, deletedVehicle, notDeletedVehicle);
  };

  // const handleDelete = async () => {
  //   setOpenDialogue(false);
  //   console.log(vehiculo);
  //   setEliminar(false);
  // };
  //---------------------------------------------------------------------
  return (
    <tr className={editar ? "editar" : (eliminar ? "eliminar" : "")}>
      {editar ? (
        <>
          <td>
            <select
              value={vehiculo.marca}
              onChange={handleVehicle}
              name="marca"
              className="w-full min-h-2 rounded-lg"
              required
            >
              <option value={''} disabled>
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
          </td>
          <td>
            <input
              type="text"
              name="gama"
              className="w-full min-h-2 rounded-lg"
              value={vehiculo.gama}
              onChange={handleVehicle}
            ></input>
          </td>
          <td>
            <input
              type="number"
              name="modelo"
              className="w-full min-h-2 rounded-lg"
              value={vehiculo.modelo}
              onChange={(e) => {
                setVehiculo((prevVehiculo) => ({
                  ...prevVehiculo,
                  modelo: Number(e.target.value),
                }));
              }}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="color"
              className="w-full min-h-2 rounded-lg"
              value={vehiculo.color}
              onChange={handleVehicle}
            ></input>
          </td>
          <td>
            <input
              type="number"
              step="0.01" min="0"
              name="precio"
              className="w-full min-h-2 rounded-lg"
              value={vehiculo.precio}
              onChange={(e) => {
                setVehiculo((prevVehiculo) => ({
                  ...prevVehiculo,
                  precio: Number(e.target.value),
                }));
              }}
            ></input>
          </td>
        </>
      ) : (
        <>
          <td>{vehicle.marca}</td>
          <td>{vehicle.gama}</td>
          <td>{vehicle.modelo}</td>
          <td>{vehicle.color}</td>
          <td><ScientificNotation number={vehicle.precio} /></td>
        </>
      )}
      <td>
        <div className="flex justify-evenly">
          {editar ? (
            <>
              {/* <Tooltip title='Confirm-edit' arrow> */}
              <i
                onClick={() => setOpenDialogue(true)}
                className="fas fa-check text-indigo-800 hover:text-indigo-500"
                title="Confirm-edit"
              />
              {/* </Tooltip>
              <Tooltip title='Cancel' arrow> */}
              <i
                onClick={() => {
                  setEditar(false);
                  setVehiculo({ ...vehicle });
                }}
                className="fas fa-times text-indigo-800 hover:text-indigo-500"
                title="Cancel"
              />
              {/* </Tooltip> */}
            </>
          ) : (
            <>
              {eliminar ? (
                <>
                  {/* <Tooltip title="Confirm-delete" arrow> */}
                  <i
                    onClick={() => setOpenDialogue(true)}
                    className="fas fa-check text-red-800 hover:text-red-500"
                    title="Confirm-delete"
                  />
                  {/* </Tooltip>
                  <Tooltip title="Cancel" arrow> */}
                  <i
                    onClick={() => setEliminar(false)}
                    className="fas fa-times text-red-800 hover:text-red-500"
                    title="Cancel"
                  />
                  {/* </Tooltip> */}
                </>
              ) : (
                <>
                  {/* <Tooltip title="Edit" arrow> */}
                  <i
                    onClick={() => setEditar(true)}
                    className="fas fa-pencil-alt text-indigo-800 hover:text-indigo-500"
                    title="Edit"
                  />
                  {/* </Tooltip>
                  <Tooltip title="Delete" arrow> */}
                  <i
                    onClick={() => setEliminar(true)}
                    className="fas fa-trash text-red-800 hover:text-red-500"
                    title="Delete"
                  />
                  {/* </Tooltip> */}
                </>
              )}
            </>
          )}
        </div>
        <Dialog open={opendDialogue}>
          <div className="flex flex-col items-center p-4 font-bold">
            <h1>{`¿Esta seguro de ${
              eliminar ? "eliminar" : "editar"
            } el registro?`}</h1>
            <div
              className="w-full flex justify-evenly mt-4 mb-1"
              onKeyDown={handleKeyDown}
              tabIndex="0"
            >
              <button
                onClick={eliminar ? handleDelete : handleEdit}
                ref={btnConfirmRef}
                autoFocus
                className={`focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 rounded-md ${
                  eliminar ? "bg-red-500" : "bg-indigo-500"
                } py-1 px-2 text-white`}
              >
                Confirmar
              </button>
              <button
                onClick={() => setOpenDialogue(false)}
                ref={btnCancelRef}
                className="focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md bg-gray-500 p-1 px-2 text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

export default VehicleTable;
