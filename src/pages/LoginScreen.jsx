import React from 'react'
import { Link } from 'react-router-dom'
import googleIcon from '../media/buscar.png'
import homeIcon from '../media/casa1.png'

// appearance-none focus:outline-none
const LoginScreen = () => { // className='flex items-center'
  return (
    <>
      <div className='flex items-center pb-1 pt-4'>
        <Link to={'/'}>
          <img src={homeIcon} alt='Home' className='ml-2 w-12 h-auto bg-white' />
        </Link>
        <h1 className='ml-auto mr-auto text-center text-2xl font-bold'>Inicia sesión en tu cuenta</h1>
      </div>
      <form className='w-3/5 min-w-72 max-w-lg ml-auto mr-auto pb-2 text-lg' method='post' action=''>
        <fieldset className='py-6 border-b-4 border-slate-800'>
          <label htmlFor='email' className='block mb-2 mt-2'>Ingrese su email: <input type='email' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2 border-2 border-slate-700 cursor-pointer' id='email' name='email' required /></label>
          <label htmlFor='password' className='block mb-2 mt-2'>Ingrese su contraseña: <input type='password' className='w-full mt-2 min-h-2 rounded-lg bg-blue-950 text-white p-2 border-2 border-slate-700  cursor-pointer' id='password' name='password' pattern="[a-z0-5]{8,}" required /></label>
        </fieldset>
        <fieldset className='py-4 border-b-4 border-slate-800'>
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
            <input type='submit' value={'Iniciar sesión'} className='boton' />
          </Link>
          <Link to={'/'}>
            <button className='boton'><img src={googleIcon} alt="Google" className='inline w-5 h-auto mr-4 mb-1' /><span className='inline-block mb-1'>Continuar con Google</span></button>
          </Link>
        </fieldset>
      </form>
    </>
  )
}

export default LoginScreen