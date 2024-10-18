import { Dialog } from "@mui/material";
import ScientificNotation from "components/ScientificNotation";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const ShoppingCart = ({ vehicles, updateVehicle, deleteVehicle, total }) => {
  return (
    <div className="tabla">
      <legend>
        <legend className="text-center font-extrabold my-2">
          Carrito de compras
        </legend>
      </legend>
      <div className="hidden md:block">
        <table className="w-full min-w-96">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Gama</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Cant.</th>
              <th>Total</th>
              <th className="w-1/12"> Acciones </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicleSale) => {
              // { cantidad, marca, gama, modelo, color, precio }
              return (
                <SaleRow
                  key={nanoid()}
                  vehicle={vehicleSale}
                  updateVehicle={updateVehicle}
                  deleteVehicle={deleteVehicle}
                />
                //   <tr key={nanoid()}>
                //     <td>{cantidad}</td>
                //     <td>{marca}</td>
                //     <td>{gama}</td>
                //     <td>{modelo}</td>
                //     <td>{color}</td>
                //     <td>
                //       <ScientificNotation number={precio} />
                //     </td>
                //   </tr>
              );
            })}
            <tr className="font-bold border-t-2 border-gray-900 lastTr">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>
                <ScientificNotation number={total} />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SaleRow = ({ vehicle, updateVehicle, deleteVehicle }) => {
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [vehiculo, setVehiculo] = useState({ ...vehicle });
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
    const cantidad = Number(e.target.value);
    setVehiculo((prevVehiculo) => ({
      ...prevVehiculo,
      cantidad: cantidad,
      precio: (cantidad * vehicle.precio) / vehicle.cantidad,
    }));
  };

  //-------------------------------------------------

  const handleEdit = () => {
    setOpenDialogue(false);
    const { cantidad } = vehiculo;
    if (cantidad < 0) {
      toast.warn("La cantidad no debe ser negativa");
    } else {
      if (cantidad === 0) {
        deleteVehicle(vehicle); //vehicle es una referencia dentro de vehicles
      } else {
        updateVehicle(vehiculo); // Podría usar vehicle
      }
      setEditar(false);
    }
  };

  const handleDelete = async () => {
    setOpenDialogue(false);
    deleteVehicle(vehiculo);
    setEliminar(false);
  };

  return (
    <tr className={editar ? "editar" : eliminar ? "eliminar" : ""}>
      <td>{vehicle.marca}</td>
      <td>{vehicle.gama}</td>
      <td>{vehicle.modelo}</td>
      <td>{vehicle.color}</td>
      {editar ? (
        <>
          <td>
            <input
              type="number"
              //min={1} Esta propiedad aquí no funciona; el input no está en un form con un botón submit
              name="cantidad"
              className="w-full min-h-2 rounded-lg"
              value={vehiculo.cantidad}
              onChange={handleVehicle}
            ></input>
          </td>
        </>
      ) : (
        <td>{vehicle.cantidad}</td>
      )}
      <td>
        <ScientificNotation number={vehicle.precio} />
      </td>
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

export default ShoppingCart;
