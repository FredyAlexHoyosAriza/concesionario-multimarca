import React from 'react'
import concessionaireLogo from 'media/concesionario-de-coches.png'

const LogoConcesionario = () => {
  return (// mx-auto
    <img src={concessionaireLogo} alt='Img Concesionario' className='w-14 h-auto pr-2 mx-auto hover:cursor-pointer' />
  )
}

export default LogoConcesionario