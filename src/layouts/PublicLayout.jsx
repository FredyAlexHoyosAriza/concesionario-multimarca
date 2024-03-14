import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

// h-screen y h-full: contenedor del tamaño maximo luego de restar la altura
// de los otros componentes en el mismo contenedor
const PublicLayout = () => {
  return (
    <div className='flex flex-col h-screen justify-around '>
      <Navbar />
      <main className='h-screen overflow-y-scroll bg-blue-400'><Outlet /></main>
      <Footer />
    </div>
  )
}

export default PublicLayout