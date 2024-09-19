import React from 'react'
import { Link } from 'react-router-dom'
import concessionaireLogo from 'media/concesionario-de-coches.png'

/*Nota: la recomendacion para un NavBar usamos una etiqueta nav dentro de la cual va una
etiqueta ul y dentro tantos li como sean necesarios. my-3 => margin: 3rem 0; 1=0.25rem*/
const NavBar = () => {
  return (//  hover:cursor-pointer hover:scale-125
    <nav className='bg-violet-300'>
      <ul className='flex justify-between items-center my-4 px-4'>
        <li>
          <Link to={'/'}>
        <img src={concessionaireLogo} alt='Img Concesionario' className='ml-2 w-14 h-auto hover:cursor-pointer hover:scale-125' />
          </Link>
        </li>
        <li>Navegacion 1</li>
        <li>Navegacion 2</li>
        <li>Navegacion 3</li>
        <li>Navegacion 4</li>
        <li className='p-2'>
          <Link to={'/login'}>
            <button className='m-1 bg-indigo-500 p-2 border border-x-sky-900 text-white rounded-lg shadow-gray-400 hover:scale-110 hover:bg-indigo-900'>Login</button>
          </Link>
          <Link to={'/register'}>
            <button className=' bg-green-600 p-2 border border-x-lime-950 text-white rounded-lg shadow-gray-400 hover:scale-110 hover:bg-indigo-900'>Register</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar