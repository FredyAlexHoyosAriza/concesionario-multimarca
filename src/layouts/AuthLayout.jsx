import React from 'react'
import { Outlet } from 'react-router-dom'

// flex flex-col justify-center items-center h-screen w-screen py-2 
const AuthLayout = () => {
  return (
    <div className='px-4 h-screen bg-slate-900 text-white font-tahoma box-border overflow-auto'>
      <Outlet />
    </div>
  )
}

export default AuthLayout