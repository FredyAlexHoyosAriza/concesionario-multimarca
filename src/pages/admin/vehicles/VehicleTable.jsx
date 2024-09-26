import { Dialog, Tooltip } from "@mui/material";
import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const VehicleTable = ({ listaVehiculos, setGetVehicles }) => {
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    console.log(busqueda);
  
  }, [busqueda])
  


  return (
    <div className="w-full text-xl text-gray-900 tabla">
      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar" className="rounded-lg border border-gray-700 px-4 py-2"/>
      <legend className="text-center font-extrabold my-2">
        Todos los vehículos
      </legend>
      <table className="w-full min-w-96">
        <thead>
          <tr>
            <th> Marca </th>
            <th> Gama </th>
            <th> Modelo </th>
            <th> Color </th>
            <th className="w-1/12"> Acciones </th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map((vehiculo) => {
            //({ marca, gama, modelo, color, id })
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
  );
};

const VehicleRow = ({ vehicle, setGetVehicles }) => {
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [vehiculo, setVehiculo] = useState(vehicle);
  const [opendDialogue, setOpenDialogue] = useState(false);
  const btnConfirmRef = useRef(null);
  const btnCancelRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      btnCancelRef.current.focus(); // Enfocar el botón derecho
    } else if (e.key === 'ArrowLeft') {
      btnConfirmRef.current.focus(); // Enfocar el botón izquierdo
    }
  };

  const handleVehicle = (e) => {
    setVehiculo((prevVehiculo) => ({
      ...prevVehiculo,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleEdit = async () => {
  //   const options = {
  //     method: "PATCH",
  //     url: "http://localhost:3000/vehicle/edit/",
  //     headers: { "content-type": "application/json" },
  //     data: vehiculo,
  //   };
  //   await axios
  //     .request(options)
  //     .then(function (response) {
  //       setGetVehicles(prevGetVehicles => !prevGetVehicles);
  //       setEditar(false);
  //       console.log(response.data);
  //       toast.success("Registro actualizado con exito!!!");
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //       toast.error("El Registro no pudo ser actualizado");
  //     });
  // };

  const handleEdit = () => {
    setOpenDialogue(false)
    const { modelo } = vehiculo;
    if (modelo < 1992 || modelo > 2025) {
      toast.warn("El modelo debe estar entre 1992 y 2025");
    } else {
      console.log(vehiculo);
      setEditar(false);
    }
    //cada vez que cambia un registro se traen todos los registros desde DB y se renderiza la tabla
    //aquí aún no actualiza desde BD por ello se debe resetear el estado vehículo
    setVehiculo(vehicle);
  };

  // const handleDelete = async () => {
  //   const options = {
  //     method: "DELETE",
  //     url: "http://localhost:3000/vehicle/delete/",
  //     headers: { "content-type": "application/json" },
  //     data: { _id: vehicle._id },
  //   };
  //   await axios
  //     .request(options)
  //     .then(function (response) {
  //       setGetVehicles((prevGetVehicles) => !prevGetVehicles);
  //       setEliminar(false);
  //       console.log(response.data);
  //       toast.success("Registro eliminado con exito!!!");
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //       toast.error("El Registro no pudo ser eliminado");
  //     });
  // };

  const handleDelete = async () => {
    setOpenDialogue(false)
    console.log(vehiculo);
    setEliminar(false);
  };

  /*En los inputs se usa defalultValue y no value, ya que el defaultValue se carga solo el inicio
  y luego permite la modificación del valor en el input, en tanto value no permite la modificación */

  return (
    <tr className={editar ? "editar" : eliminar && "eliminar"}>
      {editar ? (
        <>
          <td>
            <input
              type="text"
              name="marca"
              value={vehiculo.marca}
              onChange={handleVehicle}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="gama"
              value={vehiculo.gama}
              onChange={handleVehicle}
            ></input>
          </td>
          <td>
            <input
              // min={1992}
              // max={2025}
              type="number"
              name="modelo"
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
              value={vehiculo.color}
              onChange={handleVehicle}
            ></input>
          </td>
        </>
      ) : (
        <>
          <td>{vehicle.marca}</td>
          <td>{vehicle.gama}</td>
          <td>{vehicle.modelo}</td>
          <td>{vehicle.color}</td>
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
                  setVehiculo(vehicle);
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
            <div className="w-full flex justify-evenly mt-4 mb-1" onKeyDown={handleKeyDown} tabIndex="0">
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
