import React from "react";

const VehicleTable = ({ listaVehiculos }) => {
  return (
    <div className="flex-grow text-xl text-gray-900">
      <legend className="text-center font-extrabold my-2">
        Todos los vehículos
      </legend>
      <table className="min-w-96">
        <thead>
          <tr>
            <th> Marca </th>
            <th> Gama </th>
            <th> Modelo </th>
            <th> Color </th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map(({ marca, gama, modelo, color }) => {
            return (
              <tr>
                <td>{marca}</td>
                <td>{gama}</td>
                <td>{modelo}</td>
                <td>{color}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
