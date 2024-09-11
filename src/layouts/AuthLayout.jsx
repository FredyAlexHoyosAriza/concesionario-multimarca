import React from 'react'
import homeIcon from 'media/casa2.png'
import { Outlet, Link } from 'react-router-dom';
import concessionaireLogo from 'media/concesionario-de-coches.png'

// flex flex-col justify-center items-center h-screen w-screen py-2 // items-center
const AuthLayout = () => {
  return (
    <div className='px-4 h-screen bg-slate-900 text-white font-tahoma box-border overflow-auto'>
      <div className='flex mt-4 mb-3'>
        <Link to={'/'}>
          <img src={homeIcon} alt='Home' className='ml-2 w-12 h-auto hover:cursor-pointer hover:scale-125' />
        </Link>
        <img src={concessionaireLogo} alt='Img Concesionario' className='w-32 h-auto mr-auto ml-auto -translate-x-1/4' />
      </div>
      <Outlet />
    </div>
  )
}

      // <div className='relative flex items-center pt-4'>
      //   <Link to={'/'}>
      //     <img src={homeIcon} alt='Home' className='ml-2 w-12 h-auto hover:cursor-pointer hover:scale-125' />
      //   </Link>
      //   <div className='flex-grow relative'>
      //     <div className='absolute left-1/2 -translate-x-1/2'>
      //       <img src={concessionaireLogo} alt='Img Concesionario' className='w-32 h-auto' />
      //     </div>
      //   </div>
      // </div>

export default AuthLayout