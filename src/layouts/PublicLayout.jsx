import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// h-screen y h-full: contenedor del tamaño maximo luego de restar la altura
// de los otros componentes en el mismo contenedor
const PublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col h-screen justify-around '>
      <Navbar />
      <main className='h-screen overflow-y-scroll bg-blue-400'>{children}</main>
      <Footer />
    </div>
  )
}

export default PublicLayout