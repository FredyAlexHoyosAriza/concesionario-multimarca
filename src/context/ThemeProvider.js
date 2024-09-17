// ThemeContext.js (puedes usar .js o .jsx)
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const ThemeContext = createContext(null);

// Crear el ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);

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