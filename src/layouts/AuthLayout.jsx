import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>Autentication layout
      <Outlet />
    </div>
  )
}

export default AuthLayout