import React from 'react'
import SideBar from '../components/SideBar'

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <SideBar />
      <main>{children}</main>
    </div>
  )
}

export default PrivateLayout