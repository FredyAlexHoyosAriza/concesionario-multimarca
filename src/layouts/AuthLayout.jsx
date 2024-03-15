import React from 'react'
import { Outlet } from 'react-router-dom'

// flex flex-col justify-center items-center h-screen w-screen py-2 
const AuthLayout = () => {
  return (
    <div className='px-4 bg-slate-900 text-white font-tahoma'>
      <Outlet />
    </div>
  )
}

export default AuthLayout