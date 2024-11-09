import React from "react"; //, { useEffect, useState }
// import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "context/UserProvider";

const Profile = () => {
  const { userData } = useUser();
  return (
    <div>
      <h1>User info</h1>
      <img src={userData.picture} alt={userData.name} />
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      <h3>Tema: {userData.theme_preference}</h3>
    </div>
  );
};

export default Profile;
