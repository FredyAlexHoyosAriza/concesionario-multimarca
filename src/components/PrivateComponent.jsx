import { useUser } from "context/UserProvider";
import React from "react";

const PrivateComponent = ({ roles=[], children }) => {
  const roleList = ['admin', ...roles];
  const { userData } = useUser();
  if (roleList.includes(userData.role)) return children;
  return <></>;
};

export default PrivateComponent;
