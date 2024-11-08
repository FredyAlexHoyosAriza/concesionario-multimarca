import axios from "axios";

//Este-es-un-interceptor-de-axios-funciona-como-una-especie-de-middleware-o-factor-común;-evita-redundancia
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token'); // Se obtiene el token guardado en local storage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//---Hasta aquí va el interceptor de axios apiClient-------------------------------------------------

export const getRecs = async (urlPart, successCallback, errorCallback) => {
  //Se usa slash (/) al final para que funcione en Safari
  try {
    const response = await apiClient.get(`${urlPart}/`);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
  }
};

export const saveRec = async (newReg, urlPart, successCallback, errorCallback) => {
  try {
    const response = await apiClient.post(`${urlPart}/`, newReg, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    successCallback(response);
  } catch (error) {
    errorCallback(error);
  }
};

export const editRec = async (reg, urlPart, successCallback, errorCallback) => {
  try {
    const response = await apiClient.put(`${urlPart}/`, reg, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    successCallback(response);
  } catch (error) {
    errorCallback(error);
  }
};

export const deleteRec = async (urlPart, successCallback, errorCallback) => {
  try {
    const response = await apiClient.delete(`${urlPart}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    successCallback(response);
  } catch (error) {
    errorCallback(error);
  }
};

export const patchRec = async (reg, urlPart, successCallback, errorCallback) => {
  try {
    const response = await apiClient.patch(`${urlPart}/`, reg, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    successCallback(response);
  } catch (error) {
    errorCallback(error);
  }
};

