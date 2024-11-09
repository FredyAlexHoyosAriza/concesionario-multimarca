// ThemeContext.js (puedes usar .js o .jsx)
import React, { createContext, useState, useContext } from 'react';
import { useUser } from './UserProvider';

// Crear el contexto
export const ThemeContext = createContext(null);

// Crear el ThemeProvider
export const ThemeProvider = ({ children }) => {
  const { userData } = useUser();
  const [theme, setTheme] = useState(userData.theme_preference || 'dark');

  const toggleTheme = () => {
    // 'light' -> true
    // 'dark' -> false
    setTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useTheme = () => useContext(ThemeContext);