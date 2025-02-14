// import { useTheme } from 'context/ThemeProvider'
import React from 'react'


// Esta es la ruta de entrada del panel de administracion es como el Index para administracion
const AdminScreen = () => {
  // const { isLight } = useTheme();
  return (
    //En react la propiedad style recibe como argumento un objeto con claves estilo: valor
    // <div style={{ background: isLight ? '#fff' : '#333', color: isLight ? '#000' : '#fff' }}>AdminScreen; Index del panel de administración</div>
    // <div className={`bg-${isLight ? "white" : "gray-800"} text-${isLight ? "gray-900" : "white"}`} >AdminScreen; Index del panel de administración</div>
    <div>AdminScreen; Index del panel de administracion</div>
  )
}

export default AdminScreen