import React from 'react'

const ManageVehicles = () => {
  return (
    <div>
      <h2 className='text-center text-xl font-bold my-2'>Formulario de creacion de vehiculo</h2>
      <form action="" className='flex flex-col'>
        <input type="text" placeholder='Marca'/>
        <input type="text" placeholder='Modelo'/>
        <input type="text" placeholder='Color'/>
        <input type="submit" value={'Submit'} className='border border-slate-800'/>
      </form>
    </div>
  )
}

export default ManageVehicles