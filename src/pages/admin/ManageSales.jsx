import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { saveRec, updateRecs } from "utils/api";

const ManageSales = () => {
  const [sellers, setSellers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    (async () =>
      updateRecs(
        "usuarios",
        (response) => {
          setSellers(response.data);
        },
        (error) => {
          console.error(error);
        }
      ))();
    (async () =>
      updateRecs(
        "vehiculos",
        (response) => {
          setVehicles(response.data);
        },
        (error) => {
          console.error(error);
        }
      ))();
  }, []);

  // succes callback
  const savedRec = async (response) => {
    console.log(response.data);
    toast.success("Registro guardado con exito!!!");
  };

  // error callback
  const notSavedRec = (error) => {
    console.error(error);
    toast.error(`Error al guardar registro: ${error.message}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Obtén directamente el formulario
    const venta = {
      precio_total: parseFloat(formData.get("costo")),//Se obtiene campo costo y se convierte de string a float
      vendedor: sellers.find(({ _id }) => _id === formData.get("vendedor")),//find retorna la primera coincidencia
      vehiculo: vehicles.find(({ _id }) => _id === formData.get("vehiculo")),
    };
    console.log(venta);
    await saveRec(venta, "ventas", savedRec, notSavedRec);
    document.getElementById("venta").reset(); // Resetear inputs del formulario
  };

  return (
    <div>
      <form id="venta" onSubmit={handleSubmit} className="text-xl lg:w-full">
        <legend className="font-bold my-2 text-center text-2xl">Ingresar venta</legend>
        <fieldset>
          <label htmlFor="vendedor" className="block mb-1">
            <span className="inline-block pl-2">Vendedor: </span>
            <select
              id="vendedor"
              name="vendedor"
              className="w-full mt-1 min-h-2 rounded-lg"
              required
              defaultValue={""}
            >
              <option value={""} disabled>
                Seleccione un vendedor
              </option>
              {sellers.map(({ nombre, _id }) => {
                return (
                  <option key={nanoid()} value={_id}>
                    {nombre}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="vehiculo" className="block mb-1">
            <span className="inline-block pl-2">Vehiculo: </span>
            <select
              id="vehiculo"
              name="vehiculo"
              className="w-full mt-1 min-h-2 rounded-lg"
              required
              defaultValue={""}
            >
              <option value={""} disabled>
                Seleccione un vehículo
              </option>
              {vehicles.map(({ _id, marca, modelo, gama, color }) => {
                return (
                  <option
                    key={nanoid()}
                    value={_id}
                  >{`${marca} ${modelo} ${gama} ${color}`}</option>
                );
              })}
            </select>
          </label>
          <label htmlFor="costo" className="block">
            <span className="inline-block pl-2">Valor total: </span>
            <input
              id="costo"
              name="costo"
              type="number"
              step="0.01" min="0"
              className="w-full mt-1 min-h-2 rounded-lg"
              placeholder="Ingrese el total"
              required
            />
          </label>
        </fieldset>
        <button
          type="submit"
          className="w-full mt-4 min-h-2 rounded-lg border-slate-800 p-2 bg-green-700 text-white"
        >
          Registrar venta
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
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

export default ManageSales;
