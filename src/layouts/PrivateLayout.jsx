import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <div>
      <SideBar />
      <main><Outlet /></main>
    </div>
  )
}

export default PrivateLayout