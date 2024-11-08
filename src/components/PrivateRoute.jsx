import { useUser } from 'context/UserProvider';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ roles = [] }) => {//, 'seller'
  const roleList = useMemo(() => ['admin', ...roles], [roles]);
  const { userData } = useUser(); // Usuario autenticado
  const navigate = useNavigate();
  const location = useLocation();

  const hasAccess = roleList.includes(userData.role);

  useEffect(() => {
    if (!hasAccess) {
      // Redirige a la ruta previa o, si no existe, regresa una página en el historial
      navigate(location.state?.from || -1, { replace: true });
    }
  }, [userData.role, roleList, navigate, location, hasAccess]);
  
  /*si el usuario hace un click que lo dirige a ruta prohibida es regresado a su ruta anterior,
  si el usuario trata de ingresar desde barra de direcciones, entonces se muestra null*/
  return hasAccess ? <Outlet /> : null;
};

export default PrivateRoute;
