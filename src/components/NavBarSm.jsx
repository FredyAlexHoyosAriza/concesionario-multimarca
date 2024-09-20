import React, { useState } from "react";
import NavMenu from "./NavMenu";

const NavBarSm = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  return (
    <div
      className="sm:hidden hover:text-yellow-600"
      onClick={() => setShowNavMenu((prevShowNavMenu) => !prevShowNavMenu)}
    >
      <i className={`fas fa-${showNavMenu ? "times" : "bars"}`} />
      {showNavMenu && <NavMenu menuStyle={'menu-sm'}/>}
    </div>
  );
};

export default NavBarSm;
