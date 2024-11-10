import React from "react"; //, { useEffect, useState }
// import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "context/UserProvider";

const Profile = () => {
  const { userData } = useUser();
  return (
    <div className="flex-grow flex flex-col my-4 place-items-center self-center text-center font-bold text-xl text-slate-900">
      <h1 className="text-2xl">Información de usuario</h1>
      <img className="my-4 rounded-full w-2/3 mx-auto" src={userData.picture} alt={userData.name} />
      <h2>{userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      <h3>Tema: {userData.theme_preference}</h3>
    </div>
  );
};

export default Profile;
