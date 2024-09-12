import React from 'react'
import { Link } from 'react-router-dom'
import googleIcon from 'media/buscar.png'

// appearance-none focus:outline-none
const LoginScreen = () => { // className='flex items-center' form className='w-3/5
  return (
    <form className='w-fit min-w-72 max-w-lg ml-auto mr-auto pb-2 text-lg' method='post' action=''>
      <legend className='text-center text-2xl font-bold'>Inicia sesión en tu cuenta</legend>
      <fieldset className='mt-4'>
        <label htmlFor='email' className='block mb-2 mt-2'>Ingrese su email: <input type='email' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2 border-2 border-slate-700 cursor-pointer' id='email' name='email' required /></label>
        <label htmlFor='password' className='block mb-2 mt-2'>Ingrese su contraseña: <input type='password' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2 border-2 border-slate-700  cursor-pointer' id='password' name='password' pattern="[a-z0-5]{8,}" required /></label>
        <label htmlFor='record' className='block mt-6 hover:cursor-pointer'>
          <input type='checkbox' id='record' name='record' checked /> Recordar correo y contraseña
        </label>
      </fieldset>
      <fieldset className='mt-5 pb-6 border-b-4 border-slate-800'>
        <Link to={'/admin'}>
          <button type='submit' className='boton'>Iniciar sesión</button>
          {/* <input type='submit' value={'Iniciar sesión'} className='boton' /> */}
        </Link> 
        <Link to={'/'}>
          <button className='boton'><img src={googleIcon} alt="Google" className='inline w-5 h-auto mr-4 mb-1' /><span className='inline-block mb-1'>Continuar con Google</span></button>
        </Link>
      </fieldset>
      <fieldset className='mb-2 mt-3 flex justify-between text-lime-300'>
        <Link to={'/'}>¿Olvidaste tu contraseña?</Link>
        <Link to={'/register'}>Registrate</Link>
      </fieldset>
    </form>
  )
}

export default LoginScreen