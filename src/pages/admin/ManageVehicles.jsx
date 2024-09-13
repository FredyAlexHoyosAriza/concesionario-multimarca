import React, { useEffect, useState } from "react";

const ManageVehicles = () => {
  const [vehicleBrand, setVehicleBrand] = useState(""); // valor inicial del estado: vehicleBrand=''
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [contador, setContador] = useState(0);

  const sendRegToBack = () => {
    console.log("Enviando datos al backend: ", vehicleBrand);
  };

  /*Se puede establecer la ejecución de una acción determinada ante la ocurrencia de un evento
  Para ello debe establecerse la acción, el evento, y el elemento asociado al evento. Usualmente
  los eventos se usan para causar cambios en estados de useState */

  /* useEffect me permite establecer la ejeucción de una acción ante la ocurrencia de un cambio en
  una variable; quizá un estado de useState*/

  useEffect(
    () =>
      console.log(
        "Soy un useEffect que solo se ejecuta cuando se carga y cuando se renderiza 'Gestionar vehiculos', ya que el array de dependencias esta vacío"
      ),
    []
  );

  // useEffect(() => {
  //   console.log(
  //     "Este useEffect se ejecuta SIEMPRE que se detecta un cambio en un estado, puesto que no tiene un array de dependencias"
  //   );
  // });
  /* No se recomienda el uso de este tipo de usEffect; ya que si en el se ejecuta código que cambie un
  estado, entonces, el cambio en el estado provoca que usEffect se ejecute y este a su vez cambia la
  variable, esto produce un ciclo inifnito */

  useEffect(() => {
    console.log("Me ejecuto porque soy berraco, con cada carga, cada renderizado, y cada cambio en el estado contador");
  }, [contador]);

  useEffect(() => {
    console.log(
      `Me ejecuto, con cada carga, cada renderizado, y luego de que se ingresa la marca del vehículo: ${vehicleBrand}`
    );
  }, [vehicleBrand]);

  return (
    <div className="flex flex-col align-middle justify-center">
      <h1 className="text-center">{contador}</h1>
      <h1 className="text-center">{`Vehículo: ${vehicleBrand}, ${vehicleModel}, ${vehicleColor}`}</h1>

      <button
        onClick={() => {
          return setContador(contador + 1);
        }}
        className="border-4 border-violet-950 mx-auto"
      >
        Incrementar
      </button>
      <button
        onClick={() => sendRegToBack()}
        className="border-4 border-violet-950 mx-auto"
      >
        Imprimir marca en consola
      </button>

      <form action="" className="flex flex-col">
        <legend className="text-center text-xl font-bold my-2">
          Formulario de creacion de vehículo
        </legend>
        <input
          onBlur={(e) => {
            setVehicleBrand(e.target.value);
          }}
          type="text"
          placeholder="Marca"
        />
        <input
          onBlur={(e) => {
            setVehicleModel(e.target.value);
          }}
          type="text"
          placeholder="Modelo"
        />
        <input
          onBlur={(e) => {
            setVehicleColor(e.target.value);
          }}
          type="text"
          placeholder="Color"
        />
        <input
          type="submit"
          value={"Submit"}
          className="border border-slate-800 bg-indigo-800 text-white"
        />
      </form>
    </div>
  );
};

export default ManageVehicles;
