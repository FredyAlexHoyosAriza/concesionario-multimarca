import React from "react";

const AddDBVehicle = ({ infoNuevoVehiculo }) => {
  const handleSubmit = (e) => {
    // const nuevoVehiculo = {};
    // fd.forEach((value, key) => nuevoVehiculo[key] = value)
    e.preventDefault(); //Evita que la página se recargue con el envio, que ahora se maneja con js permitiendo ejecutar lógica previa
    const formData = new FormData(e.currentTarget); // Obtén directamente el formulario
    const nuevoVehiculo = Object.fromEntries(formData.entries()); // Convierte el FormData a un objeto
    nuevoVehiculo.modelo = parseInt(nuevoVehiculo.modelo, 10);//segundo argumento base decimal (10)
    infoNuevoVehiculo(nuevoVehiculo);
    // document.getElementById("vehicle").reset();// Resetear inputs del formulario
  };

  return (
    <form id="vehicle" onSubmit={handleSubmit} className="text-xl lg:w-2/5">
      <legend className="font-bold my-2 text-center">
        Formulario de creación de vehículo
      </legend>
      <fieldset>
        <label htmlFor="marca" className="block">
          <span className="inline-block pl-2">Marca: </span>
          <select
            id="marca"
            name="marca"
            className="w-full mt-1 min-h-2 rounded-lg"
            required
            defaultValue={''}
          >
            <option value={''} disabled>
              Seleccione una marca
            </option>
            <option>BMW</option>
            <option>Chevrolet</option>
            <option>Ferrari</option>
            <option>Ford</option>
            <option>lamborgini</option>
            <option>Mazda</option>
            <option>Mustang</option>
            <option>Renault</option>
            <option>Tesla</option>
            <option>Toyota</option>
          </select>
        </label>
        <label htmlFor="modelo" className="block">
          <span className="inline-block pl-2">Modelo: </span>
          <input
            id="modelo"
            name="modelo"
            type="number"
            min={1992}
            max={2025}
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="2024"
            required
          />
        </label>
        <label htmlFor="gama" className="block">
          <span className="inline-block pl-2">Gama: </span>
          <input
            id="gama"
            name="gama"
            type="text"
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="GT Fastback"
            required
          />
        </label>
        <label htmlFor="color" className="block">
          <span className="inline-block pl-2">Color: </span>
          <input
            id="color"
            name="color"
            type="text"
            className="w-full mt-1 min-h-2 rounded-lg"
            placeholder="Orange"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full mt-4 min-h-2 rounded-lg border-slate-800 p-2 bg-green-700 text-white"
        >
          Guardar vehículo
        </button>
      </fieldset>
    </form>
  );
};

export default AddDBVehicle;
