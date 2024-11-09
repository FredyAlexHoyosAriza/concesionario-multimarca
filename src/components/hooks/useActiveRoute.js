// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useActiveRoute = (ruta) => {
  const { pathname } = useLocation();
  // const [isActive, setIsActive] = useState(false);
  // useEffect(() => {
  //   if (pathname.includes(ruta)) setIsActive(true);
  //   else setIsActive(false);
  // }, [pathname]);

  return pathname.includes(ruta,7); //isActive;
};

export default useActiveRoute;
