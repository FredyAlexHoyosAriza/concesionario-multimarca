import LoginScreen from './pages/LoginScreen';
import './styles/App.css';
import RegisterScreen from './pages/RegisterScreen';
import Index from './pages/Index';
import AdminScreen from './pages/AdminScreen';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AuthLayout from './layouts/AuthLayout';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateLayout />}>
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
