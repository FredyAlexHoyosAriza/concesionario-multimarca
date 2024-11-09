// UserContext.js (puedes usar .js o .jsx)
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const UserContext = createContext(null);

// Crear el UserProvider
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('');

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => useContext(UserContext);