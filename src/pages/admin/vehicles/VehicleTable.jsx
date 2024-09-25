import axios from "axios";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { toast } from "react-toastify";

const VehicleTable = ({ listaVehiculos, setGetVehicles }) => {
  return (
    <div className="w-full text-xl text-gray-900 tabla">
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
    const { modelo } = vehiculo;
    if (modelo < 1992 || modelo > 2025) {
      toast.warn("El modelo debe estar entre 1992 y 2025");
    } else {
      console.log(vehiculo);
      setEditar(false);
    }
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
              <i
                onClick={handleEdit}
                className="fas fa-check text-indigo-800 hover:text-indigo-500"
                title="Update"
              />
              <i
                onClick={() => {
                  setEditar(false);
                  setVehiculo(vehicle);
                }}
                className="fas fa-times text-indigo-800 hover:text-indigo-500"
                title="Cancel"
              />
            </>
          ) : (
            <>
              {eliminar ? (
                <>
                  <i
                    onClick={handleDelete}
                    className="fas fa-check text-red-800 hover:text-red-500"
                    title="Delete"
                  />
                  <i
                    onClick={() => {
                      setEliminar(false);
                      setVehiculo(vehicle);
                    }}
                    className="fas fa-times text-red-800 hover:text-red-500"
                    title="Cancel"
                  />
                </>
              ) : (
                <>
                  <i
                    onClick={() => setEditar(true)}
                    className="fas fa-pencil-alt text-indigo-800 hover:text-indigo-500"
                    title="Edit"
                  />
                  <i
                    onClick={() => setEliminar(true)}
                    className="fas fa-trash text-red-800 hover:text-red-500"
                    title="Delete"
                  />
                </>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default VehicleTable;
