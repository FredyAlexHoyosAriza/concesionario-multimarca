import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { saveRec, updateRecs } from "utils/api";
import ShoppingCart from "./ShoppingCart";

const ManageSales = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState({});
  const [dbVehicles, setDbVehicles] = useState([]); // cargados desde DB
  const [vehicles, setVehicles] = useState([]); // vehículos que se agregan a la venta
  const [total, setTotal] = useState(0);

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
          setDbVehicles(response.data);
        },
        (error) => {
          console.error(error);
        }
      ))();
  }, []);

  const handleSellerChange = (e) => {
    const vendedorId = e.target.value;
    const seller = sellers.find(({ _id }) => _id === vendedorId);
    setSelectedSeller(seller);
  };

  const handleAddToSale = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cantidad = parseInt(formData.get("cantidad"), 10);
    const newVehicleId = formData.get("vehiculo");
    const newVehicle = dbVehicles.find(({ _id }) => _id === newVehicleId);
    const precio = cantidad * newVehicle.precio;
    setVehicles((prevVehicles) => {
      // Comprobar si el vehículo ya existe
      const vehicleExists = prevVehicles.find(
        (vehicle) => vehicle._id === newVehicleId
      );

      if (vehicleExists) {
        // Si existe, sumar a la cantidad existente
        return prevVehicles.map((vehicle) =>
          vehicle._id === newVehicleId
            ? {
                ...vehicle,
                cantidad: vehicle.cantidad + cantidad,
                precio: vehicle.precio + precio,
              }
            : vehicle
        );
      } else {
        // Si no existe, agregarlo como un nuevo objeto
        return [
          ...prevVehicles,
          {
            cantidad: cantidad,
            ...newVehicle,
            precio: precio,
          },
        ];
      }
    });
    setTotal((partial) => partial + precio);
    document.getElementById("venta").reset(); // Resetear inputs del formulario
  };

  const updateVehicle = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) => {
        if (vehicle._id === updatedVehicle._id) {
          setTotal(
            (prevTotal) => prevTotal - vehicle.precio + updatedVehicle.precio
          );
          return updatedVehicle;
        }
        return vehicle;
      })
    );
  };

  const deleteVehicle = (deletedVehicle) => {
    setTotal((prevTotal) => prevTotal - deletedVehicle.precio);
    setVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle._id !== deletedVehicle._id)
    );
  };
  //-----------------SAVE SALE-------------------------------------
  // succes callback
  const savedRec = async (response) => {
    console.log(response.data);
    setSelectedSeller({});
    setTotal(0);
    setVehicles([]);
    toast.success("Registro guardado con exito!!!");
  };

  // error callback
  const notSavedRec = (error) => {
    console.error(error);
    toast.error(`Error al guardar registro: ${error.message}`);
  };

  // Manejar el guardado de la venta
  const handleSave = async () => {
    if (!selectedSeller._id) {
      toast.warn("Por favor, selecciona un vendedor");
      return;
    }

    const venta = {
      vendedor: selectedSeller,
      vehiculos: vehicles,
      total: total,
    };

    // Aquí se envía la venta a la base de datos
    saveRec(venta, "ventas", savedRec, notSavedRec);
  };
  //----------------------------------------------------------------

  return (
    <div className="text-xl">
      {/* Formulario de selección del vendedor */}
      <label htmlFor="vendedor" className="lg:w-full block mb-1">
        <legend className="font-bold my-2 text-center text-2xl">
          Ingresar vendedor
        </legend>
        <select
          id="vendedor"
          name="vendedor"
          className="w-full mt-1 min-h-2 rounded-lg"
          // required
          value={selectedSeller._id ?? ""} // Si selectedSeller._id es null o undefined value = ""
          onChange={handleSellerChange}
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
      <form id="venta" onSubmit={handleAddToSale} className="text-xl lg:w-full">
        <legend className="font-bold mt-2 text-center text-2xl">
          Ingresar venta
        </legend>
        <fieldset className="mb-1">
          <label htmlFor="vehiculo" className="inline-block">
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
              {dbVehicles.map(({ _id, marca, modelo, gama, color, precio }) => {
                return (
                  <option
                    key={nanoid()}
                    value={_id}
                  >{`${marca} ${modelo} ${gama} ${color} ${precio.toExponential(2)}`}</option>
                );
              })}
            </select>
          </label>
          <label htmlFor="cantidad" className="inline-block ml-1">
            <span className="inline-block pl-2">Cantidad: </span>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min="1"
              className="w-full mt-1 min-h-2 rounded-lg"
              defaultValue={1}
              required
            />
          </label>
        </fieldset>
        <button
          type="submit"
          className="w-full mt-4 min-h-2 rounded-lg p-2 bg-green-700 text-white"
        >
          Agregar al carrito
        </button>
      </form>
      {/* Carrito de compras */}
      <ShoppingCart
        vehicles={vehicles}
        updateVehicle={updateVehicle}
        deleteVehicle={deleteVehicle}
        total={total}
      />
      {/* Botón para guardar la venta */}
      <button
        type="button"
        onClick={handleSave}
        className="w-full mt-4 min-h-2 rounded-lg border-2 border-slate-500 p-2 bg-green-900 text-white"
      >
        Guardar venta
      </button>
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
