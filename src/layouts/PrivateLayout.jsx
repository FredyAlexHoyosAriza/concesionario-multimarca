import React from "react";
import SideBar from "components/SideBar";
import { Outlet } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";

const PrivateLayout = () => {
  // El SideBar permanece quieto, en tanto que si el main excede la pantalla en 'y',
  // un scroll permitira el desplazamiento
  return (
    <PrivateRoute>
      <div className="flex flex-col w-screen h-screen md:flex-row">
        <SideBar />
        <main className="flex-grow flex items-start justify-center w-screen h-auto p-4 bg-blue-400 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </PrivateRoute>
  );
};

export default PrivateLayout;