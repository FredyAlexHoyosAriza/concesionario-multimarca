// import { useTheme } from 'context/ThemeProvider'
import React from 'react'


// Esta es la ruta de entrada del panel de administracion es como el Index para administracion
const AdminScreen = () => {
  // const { theme } = useTheme();
  return (
    //En react la propiedad style recibe como argumento un objeto con claves estilo: valor
    // <div style={{ background: theme ? '#fff' : '#333', color: theme ? '#000' : '#fff' }}>AdminScreen; Index del panel de administración</div>
    // <div className={`bg-${theme ? "white" : "gray-800"} text-${theme ? "gray-900" : "white"}`} >AdminScreen; Index del panel de administración</div>
    <div>AdminScreen; Index del panel de administracion</div>
  )
}

export default AdminScreen