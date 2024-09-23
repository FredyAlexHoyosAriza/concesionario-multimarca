import LoginScreen from "pages/LoginScreen";
import "styles/App.css";
import RegisterScreen from "pages/RegisterScreen";
import Index from "pages/Index";
import AdminScreen from "pages/admin/AdminScreen";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageClients from "pages/admin/ManageClients";
import ManageSales from "pages/admin/ManageSales";
import ManageVehicles from "pages/admin/vehicles/ManageVehicles";
import ManageProfile from "pages/admin/ManageProfile";
import { ThemeProvider } from "context/ThemeProvider";
import AddDBVehicle from "pages/admin/vehicles/AddDBVehicle";
import VehicleTable from "pages/admin/vehicles/VehicleTable";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<PrivateLayout />}>
            <Route path="vehicles" element={<ManageVehicles />}>
              <Route path="create" element={null} />
            </Route>
            <Route path="clients" element={<ManageClients />} />
            <Route path="sales" element={<ManageSales />} />
            <Route path="profile" element={<ManageProfile />} />
            <Route index element={<AdminScreen />} />
          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path="register" element={<RegisterScreen />} />
            <Route path="login" element={<LoginScreen />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
