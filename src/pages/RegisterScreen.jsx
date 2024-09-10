import React from 'react'
import { Link } from 'react-router-dom'
import googleIcon from 'media/buscar.png'
import homeIcon from 'media/casa2.png'

const RegisterScreen = () => {
  return (
    <>
      <div className='flex items-center pt-4'>
        <Link to={'/'}>
          <img src={homeIcon} alt='Home' className='ml-2 w-12 h-auto hover:cursor-pointer hover:scale-125' />
        </Link>
        <h1 className='mr-auto pr-12 w-screen text-center text-2xl font-bold'>Crea tu cuenta</h1>
      </div>
      <form className='w-fit min-w-72 max-w-lg ml-auto mr-auto pb-2 text-base' method='post' action=''>
        <fieldset className='py-6 border-b-4 border-slate-800 appearance-none'>
          <div className='flex justify-between'>
            <label className='block mb-2 mt-2 w-1/2' htmlFor="first-name"><span className='inline-block pl-2'>Nombres:</span><input className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600 cursor-pointer' id="first-name" name="first-name" type="text" required /></label>
            <label className='block mb-2 mt-2 w-1/2' htmlFor="last-name"><span className='inline-block pl-2'>Apellidos:</span><input className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600 cursor-pointer' id="last-name" name="last-name" type="text" required /></label>
          </div>
          <div className='flex justify-between'>
            <label htmlFor='phone' className='block mb-2 mt-2 w-1/2'><span className='inline-block pl-2'>Telefono:</span><input type='number' className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600 cursor-pointer' id='phone' name='phone' pattern="[0-9]{8,}" required /></label>
            <label htmlFor='birth-day' className='block mb-2 mt-2 w-1/2'><span className='inline-block pl-2'>Fecha de nacimiento:</span><input type='date' className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600  cursor-pointer' id='birth-day' name='birth-day' required /></label>
          </div>
          <div className='flex justify-between'>
            <label htmlFor='email' className='block mb-2 mt-2 w-1/2'><span className='inline-block pl-2'>Email:</span><input type='email' className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600 cursor-pointer' id='email' name='email' required /></label>
            <label htmlFor='password' className='block mb-2 mt-2 w-1/2'><span className='inline-block pl-2'>Contraseña:</span><input type='password' className='w-full mt-1 min-h-2 rounded-lg bg-blue-950 text-white px-2 py-1 border-2 border-slate-600  cursor-pointer' id='password' name='password' pattern="[a-z0-5]{8,}" required /></label>
          </div>
        </fieldset>
        <fieldset className='py-3 border-b-4 border-slate-800'>
          <label htmlFor="terms-and-conditions" className='block mb-2 mt-2 hover:cursor-pointer'>
            <input id="terms-and-conditions" type="checkbox" required name="terms-and-conditions" checked /> Acepto <a href="https://www.google.com.co/" target='_blank' rel="noopener noreferrer" className='underline text-lime-300'>terminos y condiciones</a>
          </label>
          <label htmlFor='record' className='block mb-2 mt-2 hover:cursor-pointer'>
            <input type='checkbox' id='record' name='record' checked /> Recordar correo y contraseña
          </label>
        </fieldset>
        <div className='mt-2 text-lg flex justify-between'>
          <span>¿Ya tienes cuenta?  <Link to={'/login'} className='underline text-lime-300 ml-2'>Inicia sesión</Link></span>          
        </div>
        <fieldset className='py-4 mt-2'>
          <Link to={'/admin'}>
            <input type='submit' value={'Registrate'} className='boton' />
          </Link>
          <Link to={'/'}>
            <button className='boton'><img src={googleIcon} alt="Google" className='inline w-5 h-auto mr-4 mb-1' /><span className='inline-block mb-1'>Registro con Google</span></button>
          </Link>
        </fieldset>
      </form>
    </>
  )
}

export default RegisterScreen