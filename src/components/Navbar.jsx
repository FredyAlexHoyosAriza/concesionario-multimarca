import React from 'react'
import { Link } from 'react-router-dom'

/*Nota: la recomendacion para un Navbar usamos una etiqueta nav dentro de la cual va una
etiqueta ul y dentro tantos li como sean necesarios. my-3 => margin: 3rem 0; 1=0.25rem*/
const Navbar = () => {
  return (
    <nav className='bg-violet-300'>
      <ul className='flex justify-between my-4'>
        <li>
          Logo App
        </li>
        <li>Navegacion 1</li>
        <li>Navegacion 2</li>
        <li>Navegacion 3</li>
        <li>Navegacion 4</li>
        <li className='p-2 bg-white'>
          <Link to={'/login'}>
            <button className='bg-indigo-500 p-2 text-white rounded-lg shadow-gray-400s hover:scale-125 hover:bg-indigo-900'>Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar