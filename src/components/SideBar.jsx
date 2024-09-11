import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    //w-72: la mitad de una pantalla mediana
    <nav className='w-72 bg-zinc-500 '>
      <ul className='box-border p-2 ml-1 font-bold text-lg text-cyan-200 h-screen flex flex-col justify-around'>
        <li>
          <Link to={'/admin/vehicles'}>Gestionar vehiculos</Link>
        </li>
        <li>
          <Link to={'/admin/clients'}>Gestionar clientes</Link>
        </li>
        <li>
          <Link to={'/admin'}>Inicio panel administración</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar