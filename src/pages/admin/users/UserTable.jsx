import { Dialog } from "@mui/material"; //, Tooltip
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { editRec, patchRec } from "utils/api";
// import useToken from "auth/useToken";
import { useUser } from "context/UserProvider";

const UserTable = ({ listaUsuarios, setGetUsers }) => {
  const [busqueda, setBusqueda] = useState("");
  const [usuariosBusqueda, setUsuariosBusqueda] = useState([...listaUsuarios]);

  useEffect(() => {
    console.log(busqueda);
    if (busqueda !== "") {
      setUsuariosBusqueda(
        listaUsuarios.filter((usuario) => {
          return JSON.stringify(usuario)
            .toLowerCase()
            .includes(busqueda.toLowerCase());
        })
      );
    } else {
      setUsuariosBusqueda(listaUsuarios);
    }
  }, [busqueda, listaUsuarios]);

  return (
    <div className="w-full text-xl text-gray-900 tabla">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="rounded-lg block mx-auto border border-gray-700 px-4 py-2"
      />
      <legend className="text-center font-extrabold my-2">
        Todas las cuentas de usuario
      </legend>
      <div className="hidden sm:block">
        <table className="w-full min-w-96">
          <thead>
            <tr>
              <th> Correo </th>
              <th> Nombre </th>
              <th> Rol </th>
              <th> Estado </th>
              <th className="w-1/12"> Acciones </th>
            </tr>
          </thead>
          <tbody>
            {usuariosBusqueda.map((usuario) => {
              //({ ..., _id, name, email, role, created_at })
              return (
                <VehicleRow
                  key={usuario._id}
                  user={usuario}
                  setGetUsers={setGetUsers}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-around sm:hidden">
        {usuariosBusqueda.map(({ _id, name, email, role, blocked }) => {
          //({ ..., _id, name, email, role, created_at }) // Cards para tamaños pequeños
          return (
            <div
              key={_id}
              className="bg-slate-500 text-white p-2 m-2 rounded-lg flex flex-col"
            >
              <span>Correo: {email} </span>
              <span>Nombre: {name} </span>
              <span>Rol: {role} </span>
              <span>Estado: {blocked ? "Inactivo" : "Activo"} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VehicleRow = ({ user, setGetUsers }) => {
  const { _id, ...userNoId } = user;
  const isDisabled = user.blocked;
  const urlPart = `usuarios/${_id}`;
  // const { refreshToken } = useToken();
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [usuario, setUsuario] = useState(userNoId);
  const [opendDialogue, setOpenDialogue] = useState(false);
  const btnConfirmRef = useRef(null);
  const btnCancelRef = useRef(null);
  const { userData, setUserData } = useUser();

  /* Obtener y decodificar el token, extraer userInfo, y de este el user_id del usuario
  loggeado, para establecer si es el mismo de la fila (registro) de usuario actual en la tabla */
  const isCurrentUser = userData.user_id === user.user_id;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      btnCancelRef.current.focus(); // Enfocar el botón derecho
    } else if (e.key === "ArrowLeft") {
      btnConfirmRef.current.focus(); // Enfocar el botón izquierdo
    }
  };

  const handleUser = (e) => {
    setUsuario((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleEmail = (e) => {
  //   setUsuario((prevUser) => ({
  //     ...prevUser,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  //-------------------------------------------------

  // success callback
  const updatedRec = (response) => {
    //En caso de que se cambie, p. ej. name o email de usuario actual se debe solicitar nuevo token
    // if (isCurrentUser) (async () => await refreshToken())();
    if (isCurrentUser) setUserData({ ...usuario });
    setGetUsers((prevGetUsers) => !prevGetUsers);
    setEditar(false);
    console.log(response.data);
    toast.success("Registro actualizado con exito!!!");
    //Si se cambia name o email de current user solicitar nuevo token
  };

  // error callback
  const unupdatedRec = (error) => {
    console.error(error);
    toast.error("El Registro no pudo ser actualizado");
  };

  const handleEdit = async () => {
    /*Solo se editan usuarios con menos privilegios; admin puede editar seller y user*/
    //No se permite editar rol del usuario actual ni la fecha de creación de nadie,
    //solo name, email y role; email debe tener formato de email, auth0 debería verificar
    if (usuario.name !== user.name || usuario.role !== user.role) {
      setOpenDialogue(false);
      // toast.warn("El precio debe ser mayor a 0");
      await editRec(usuario, urlPart, updatedRec, unupdatedRec);
    }
  };
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // success callback
  const toggledStatus = (response) => {
    //Un usuario no se elimina se bloquea con blocked = true
    /*Solo se bloquean usuarios con menos privilegios; admin puede bloquear seller y user*/
    toast.success(
      `Usuario ${isDisabled ? "desbloqueado" : "bloqueado"} con exito!!!`
    );
    setGetUsers((prevGetUsers) => !prevGetUsers);
    setEliminar(false);
    console.log(response.data);
    //Puesto que un usuario no se bloquea a si mismo, no se requiere nuevo token
  };

  // error callback
  const statusNotToggled = (error) => {
    console.error(error);
    toast.error(
      `El usuario no pudo ser ${isDisabled ? "desbloqueado" : "bloqueado"}`
    );
  };

  const toggleStatus = async () => {
    //No se permite bloquear cuenta de usuario actual
    setOpenDialogue(false);
    await patchRec(
      { user_id: user.user_id, blocked: !isDisabled },
      urlPart,
      toggledStatus,
      statusNotToggled
    );
  };
  //---------------------------------------------------------------------
  return (
    <tr className={editar ? "editar" : eliminar ? "eliminar" : ""}>
      <td>{user.email}</td>
      {editar ? (
        <>
          <td>
            <input
              type="text"
              name="name"
              className="w-full min-h-2 rounded-lg"
              value={usuario.name}
              onChange={handleUser}
            ></input>
          </td>
          {/* <td>
            <input
              type="email"
              name="email"
              className="w-full min-h-2 rounded-lg"
              value={usuario.email}
              onChange={handleEmail}
            ></input>
          </td> */}
          <td>
            <select
              value={usuario.role}
              onChange={handleUser}
              name="role"
              className="w-full min-h-2 rounded-lg"
              required
            >
              <option value={""} disabled>
                Seleccione un rol
              </option>
              <option value="admin">Administrador</option>
              <option value="seller">Vendedor</option>
              <option value="user">Usuario</option>
              <option value="client">Cliente</option>
            </select>
          </td>
          {/* <td>
            <input
              type="date"
              name="created_at"
              className="w-full min-h-2 rounded-lg"
              value={usuario.created_at}
              onChange={handleUser}
            ></input>
          </td> */}
        </>
      ) : (
        <>
          <td>{user.name}</td>
          <td>{user.role}</td>
        </>
      )}
      <td>{isDisabled ? "Inactivo" : "Activo"}</td>
      <td>
        <div className="flex justify-evenly">
          {editar ? (
            <>
              <i
                onClick={() => setOpenDialogue(true)}
                className="fas fa-check text-indigo-800 hover:text-indigo-500"
                title="Confirm-edit"
              />
              <i
                onClick={() => {
                  setEditar(false);
                  setUsuario({ ...user });
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
                    onClick={() => setOpenDialogue(true)}
                    className="fas fa-check text-red-800 hover:text-red-500"
                    title={isDisabled ? "Confirm-enable" : "Confirm-disable"}
                  />
                  <i
                    onClick={() => setEliminar(false)}
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
                    className={`fas fa-user-${
                      isDisabled ? "check" : "slash"
                    } text-red-800 hover:text-red-500`}
                    title={isDisabled ? "Enable" : "Disable"}
                  />
                </>
              )}
            </>
          )}
        </div>
        <Dialog open={opendDialogue}>
          <div className="flex flex-col items-center p-4 font-bold">
            <h1>{`¿Esta seguro de ${
              eliminar ? `${isDisabled ? "desbloquear" : "bloquear"}` : "editar"
            } el usuario?`}</h1>
            <div
              className="w-full flex justify-evenly mt-4 mb-1"
              onKeyDown={handleKeyDown}
              tabIndex="0"
            >
              <button
                onClick={eliminar ? toggleStatus : handleEdit}
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

export default UserTable;
