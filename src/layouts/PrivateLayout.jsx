import React from 'react'
import SideBar from 'components/SideBar'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  // El SideBar permanece quieto, en tanto que si el main excede la pantalla en 'y',
  // un scroll permitira el desplazamiento
  return (
    <div className='flex w-screen h-screen'>
      <SideBar />
      <main className='flex items-start justify-center w-screen h-auto p-4 bg-blue-400 overflow-auto'><Outlet /></main>
    </div>
  )
}

export default PrivateLayout