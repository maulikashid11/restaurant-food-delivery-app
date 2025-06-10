import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../contexts/AppContext'

const Login = ({ setLoginOpen, }) => {
  const [login, setLogin] = useState(true)
  const { user, setUser, url } = useContext(AppContext)
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = details
    if (!login) {
      const res = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      })
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUser(data.user)
        setLoginOpen(false)
      } else {
        toast.error(data.message)
      }
    } else {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"

      })
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUser(data.user)
        setLoginOpen(false)
      } else {
        toast.error(data.message)
      }
    }
  }
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }
  return (
    <div className='fixed top-0 inset-0 flex items-center justify-center z-10 backdrop-blur-xs shadow-4xl shadow-zinc-600'>
      <form onSubmit={handleSubmit} className='relative w-100 bg-white p-5 rounded'>
        <h1 className='text-2xl text-center'>{login ? 'Login' : 'Sign up'}</h1>
        <p onClick={() => setLoginOpen(false)} className='absolute top-3 right-3 font-bold cursor-pointer'>X</p>
        {!login &&
          <div>
            <label htmlFor="name">Name: </label>
            <input onChange={handleChange} value={details.name} className='block border rounded w-full my-2 p-2' type="text" name='name' placeholder='Enter Name' />
          </div>}
        <div className='mt-2'>
          <label htmlFor="email">Email: </label>
          <input onChange={handleChange} value={details.email} className='block border rounded w-full my-2 p-2' type="email" name='email' placeholder='Enter Email' />
        </div>
        <div className='mt-2'>
          <label htmlFor="email">Password: </label>
          <input onChange={handleChange} value={details.password} className='block border rounded w-full my-2 p-2' type="password" name='password' placeholder='Enter Password' />
        </div>
        <button className='rounded cursor-pointer text-white bg-orange-500 p-2 w-full my-2 font-bold text-xl'>{login ? 'Login' : 'Sign up'}</button>
        {
          login
            ? <p className='text-sm'>Create new? <span onClick={(e) => setLogin(false)} className='text-blue-500 cursor-pointer'>Sign up</span></p>
            : <p className='text-sm'>Already Have an Account? <span onClick={(e) => setLogin(true)} className='text-blue-500 cursor-pointer'>Login</span></p>
        }
      </form>
    </div>
  )
}

export default Login