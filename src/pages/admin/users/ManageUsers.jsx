import Loading from "components/Loading";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getRecs } from "utils/api";
import UserTable from "./UserTable";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getUsers, setGetUsers] = useState(false);
  const urlPart = "usuarios";

  // success callback
  const gettedRecs = (response) => {
    setUsers(response.data);
    toast.success("Tabla actualizada con exito!!!");
    //Solicitar nuevo token cuando el usuario admin realiza cambios sobre si mismo
  };

  // error callback
  const notGettedRecs = (error) => {
    console.error(error);
    toast.error("La tabla no pudo ser actualizada");
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getRecs(urlPart, gettedRecs, notGettedRecs);
      setIsLoading(false);
    })();
  }, [getUsers]);

  return (
    <div>
      <h2 className="mx-auto text-xl sm:text-3xl text-center font-bold text-slate-950 my-2">
        Administración de usuaios
      </h2>
      {isLoading ? (
        <div className="w-full h-full grid place-items-center">
          <Loading />
        </div>
      ) : (
        <UserTable listaUsuarios={users} setGetUsers={setGetUsers} />
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

export default ManageUsers;
