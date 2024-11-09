import React from 'react'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'
import { Outlet } from 'react-router-dom'

// h-screen y h-full: contenedor del tamaño maximo luego de restar la altura
// de los otros componentes en el mismo contenedor
const PublicLayout = () => {
  return (
    // Con NavBar y Footer fijo; Para solo NavBar fijo className='fixed' y main sin scroll
    // o simplemente podría poner el Footer y el main en un div con las clases actuales del main
    <div className='flex flex-col h-screen justify-around'>
      <NavBar />
      <main className='h-screen overflow-y-scroll bg-blue-400'><Outlet /></main>
      <Footer />
    </div>
    // Con NavBar fijo y footer movil
    /*<div className='h-screen overflow-y-scroll bg-blue-400'>
        <main className='h-full'><Outlet /></main>
        <Footer />
      </div>*/
  )
}

export default PublicLayout