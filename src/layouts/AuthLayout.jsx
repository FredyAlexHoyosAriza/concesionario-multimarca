import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from 'media/casa2.png'
import { Outlet, useLocation } from 'react-router-dom';

// flex flex-col justify-center items-center h-screen w-screen py-2 
const AuthLayout = () => {
  const {pathname} = useLocation();
  let title = 'Inicia sesión en tu cuenta'
  if (pathname === '/login') {}
  else title = 'Crea tu cuenta';
  return (
    <div className='px-4 h-screen bg-slate-900 text-white font-tahoma box-border overflow-auto'>
      <div className='flex items-center pt-4'>
        <Link to={'/'}>
          <img src={homeIcon} alt='Home' className='ml-2 w-12 h-auto hover:cursor-pointer hover:scale-125' />
        </Link> 
        <h1 className='mr-auto pr-12 w-screen text-center text-2xl font-bold'>{title}</h1>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout