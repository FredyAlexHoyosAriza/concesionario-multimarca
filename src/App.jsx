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
import ManageSales from "pages/admin/sales/ManageSales";
import ManageVehicles from "pages/admin/vehicles/ManageVehicles";
import ManageProfile from "pages/admin/ManageProfile";
import { ThemeProvider } from "context/ThemeProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import ManageUsers from "pages/admin/users/ManageUsers";
import { UserProvider } from "context/UserProvider";
import PrivateRoute from "components/PrivateRoute";

export default function App() {
  return (
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/admin`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE, //el mismo del backend; id de api de auth0
        // scope: "read:current_user update:current_user_metadata",
      }}
    >
      <UserProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/admin" element={<PrivateLayout />}>
                <Route element={<PrivateRoute roles={['seller', 'client']} />}>
                  <Route path="vehicles" element={<ManageVehicles />}>
                    <Route element={<PrivateRoute />}>
                      <Route path="create" element={null} />
                    </Route>
                  </Route>
                </Route>
                <Route element={<PrivateRoute roles={["seller"]} />}>
                  <Route path="clients" element={<ManageClients />} />
                  <Route path="sales" element={<ManageSales />} />
                </Route>
                <Route path="profile" element={<ManageProfile />} />
                <Route element={<PrivateRoute />}>
                  <Route path="users" element={<ManageUsers />} />
                </Route>
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
      </UserProvider>
    </Auth0Provider>
  );
}
