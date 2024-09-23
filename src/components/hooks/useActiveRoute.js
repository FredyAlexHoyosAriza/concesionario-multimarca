import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useActiveRoute = (ruta) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname.includes(ruta, 7)) setIsActive(true);
    else setIsActive(false);
  }, [pathname]);

  return isActive;
};

export default useActiveRoute;
