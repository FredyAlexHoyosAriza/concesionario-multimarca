import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

// h-screen y h-full: contenedor del tamaño maximo luego de restar la altura
// de los otros componentes en el mismo contenedor
const PublicLayout = () => {
  return (
    // Con Navbar y Footer fijo
    <div className='flex flex-col h-screen justify-around mx-2'>
      <Navbar />
      <main className='h-screen overflow-y-scroll bg-blue-400'><Outlet /></main>
      <Footer />
    </div>
    // Con Navbar fijo y footer movil
    /*<div className='h-screen overflow-y-scroll bg-blue-400'>
        <main className='h-full'><Outlet /></main>
        <Footer />
      </div>*/
  )
}

export default PublicLayout