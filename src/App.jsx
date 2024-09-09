import LoginScreen from 'pages/LoginScreen';
import 'styles/App.css';
import RegisterScreen from 'pages/RegisterScreen';
import Index from 'pages/Index';
import AdminScreen from 'pages/admin/AdminScreen';
import PublicLayout from 'layouts/PublicLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ManageClients from './pages/admin/ManageClients';
import ManageVehicles from './pages/admin/ManageVehicles';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path='/admin/vehicles' element={
            <ManageVehicles />} />
          <Route path='/admin/clients' element={
            <ManageClients />} />
          <Route path='/admin' element={
            <AdminScreen />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/register' element={
            <RegisterScreen />} />
          <Route path='/login' element={
            <LoginScreen />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path='/' element={
            <Index />} />
        </Route>
      </Routes>
    </Router>
  );
}
