import { useUser } from "context/UserProvider";
import React from "react";

const PrivateComponent = ({ roleList=['admin'], children }) => {
    const { userData } = useUser();
  if (roleList.includes(userData.role)) return children;
  return <></>;
};

export default PrivateComponent;
