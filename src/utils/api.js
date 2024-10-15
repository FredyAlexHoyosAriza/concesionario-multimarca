import axios from "axios";

export const updateRecs = async (urlPart, successCallback, errorCallback) => {
  const options = {
    method: "GET",
    //Se usa slash (/) al final para que funcione en Safari
    url: `http://localhost:5000/api/${urlPart}/`,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const saveRec = (newReg, urlPart, successCallback, errorCallback) => {
  // setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]); //CREATE
  // setGetVehicles((prevGetVehicles) => !prevGetVehicles); //solo si exitoso
  // setShowTable(true);
  // toast.success("Registro guardado con exito!!!");
  // const options = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   ...optionsPart,
  // }
  const options = {
    method: "POST",
    url: `http://localhost:5000/api/${urlPart}/`,
    headers: { "Content-Type": "application/json" },
    data: newReg,
  };
  axios.request(options).then(successCallback).catch(errorCallback);
};

export const editRec = async (reg, urlPart, successCallback, errorCallback) => {
  const options = {
    method: "PUT",
    url: `http://localhost:5000/api/${urlPart}/`,
    headers: { "content-type": "application/json" },
    data: reg,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const deleteRec = async (urlPart, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/api/${urlPart}/`,
    headers: { "content-type": "application/json" },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
