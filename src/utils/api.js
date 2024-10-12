import axios from "axios";
import { toast } from "react-toastify";

export const updateTable = async (setVehiculos) => {
  const options = {
    method: "GET",
    //Se usa slash (/) al final para que funcione en Safari
    url: "http://localhost:5000/api/vehiculos/",
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

export const saveVehicle = (
  nuevoVehiculo,
  setVehiculos,
  setShowTable,
  navigate
) => {
  // setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]); //CREATE
  // setGetVehicles((prevGetVehicles) => !prevGetVehicles); //solo si exitoso
  // setShowTable(true);
  // toast.success("Registro guardado con exito!!!");

  const options = {
    method: "POST",
    url: "http://localhost:5000/api/vehiculos/",
    headers: { "Content-Type": "application/json" },
    data: nuevoVehiculo,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      updateTable(setVehiculos);
      navigate("/admin/vehicles");
      setShowTable(true);
      toast.success("Registro guardado con exito!!!");
    })
    .catch(function (error) {
      console.error(error);
      toast.error(`Error al guardar registro: ${error.message}`);
    });
};
export const editVehicle = async (vehiculo, id, setGetVehicles, setEditar) => {
  const options = {
    method: "PUT",
    url: `http://localhost:5000/api/vehiculos/${id}/`,
    headers: { "content-type": "application/json" },
    data: vehiculo,
  };
  await axios
    .request(options)
    .then(function (response) {
      setGetVehicles((prevGetVehicles) => !prevGetVehicles);
      setEditar(false);
      console.log(response.data);
      toast.success("Registro actualizado con exito!!!");
    })
    .catch(function (error) {
      console.error(error);
      toast.error("El Registro no pudo ser actualizado");
    });
};

export const deleteVehicle = async (id, setGetVehicles, setEliminar) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/api/vehiculos/${id}/`,
    headers: { "content-type": "application/json" },
  };
  await axios
    .request(options)
    .then(function (response) {
      setGetVehicles((prevGetVehicles) => !prevGetVehicles);
      setEliminar(false);
      console.log(response.data);
      toast.success("Registro eliminado con exito!!!");
    })
    .catch(function (error) {
      console.error(error);
      toast.error("El Registro no pudo ser eliminado");
    });
};
