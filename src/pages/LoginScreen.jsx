import React from 'react'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
  return (
    <>
      <h1 className='mb-1 pt-4 ml-auto mr-auto text-center text-2xl'>Inicia sesión en tu cuenta</h1>
      <form className='w-7/12 min-w-72 max-w-lg ml-auto mr-auto pb-2 text-lg' method='post' action=''>
        <fieldset className='py-8 border-b-4 border-slate-800'>
          <label htmlFor='email' className='mb-2 mt-2'>Ingrese su email: <input type='email' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2 hover:cursor-pointer' id='email' name='email' required /></label>
          <label htmlFor='password' className='mb-2 mt-2'>Ingrese su contraseña: <input type='password' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2  hover:cursor-pointer' id='password' name='password' pattern="[a-z0-5]{8,}" required /></label>
        </fieldset>
        <fieldset className='py-6 border-b-4 border-slate-800'>
          <label htmlFor='record' className='block mb-2 mt-2'>
            <input type='checkbox' id='record' name='record' /> Recordar correo y contraseña
          </label>
          <label htmlFor="terms-and-conditions" className='block mb-2 mt-2'>
            <input id="terms-and-conditions" type="checkbox" required name="terms-and-conditions" /> I accept the <a href="https://www.google.com.co/" className='underline text-gray-200'>terms and conditions</a>
          </label>
        </fieldset>
        <fieldset className='mb-2 mt-2'>
          <Link to={'/'}>Olvido su contraseña?</Link>
        </fieldset>
        <fieldset className='py-6 mt-2'>
          <Link to={'/admin'}>
            <button type='submit' value={'Submit'} className='boton'>Iniciar sesión</button>
          </Link>
          <Link to={'/'}>
            <button className='boton'>Continuar con Google</button>
          </Link>
        </fieldset>
      </form>
    </>
  )
}

export default LoginScreen