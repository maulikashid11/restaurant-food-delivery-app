import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../contexts/AppContext'

const Navbar = ({ setLoginOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user,setUser, cart,url } = useContext(AppContext)
  const handleLogout = async () => {
    const res = await fetch(`${url}/api/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setUser({})
      // window.location.reload()
    }
  }


  return (
    <div className='sticky top-0 z-6 bg-white flex justify-between items-center gap-3 p-3'>
      <Link to="/" className="font-bold text-2xl">FavFood</Link>
      <ul className='md:flex hidden text-xl gap-5 '>
        <li><NavLink to='/' className={({ isActive }) => `${isActive ? "border-b-2 border-blue-600" : ""}`}>Home</NavLink></li>
        <li><NavLink to='/menu' className={({ isActive }) => `${isActive ? "border-b-2 border-blue-600" : ""}`}>Menu</NavLink></li>
      </ul>
      <div className="flex gap-3 md:gap-10 items-center">
        <Link to="/cart">
          <div className='relative'>
            <p className='absolute top-[-10px] right-[-5px] text-orange-600 font-bold text-sm'>{Object.keys(cart).length}</p>
            <img className='' src={assets.basket_icon} alt="" />
          </div>
        </Link>
        {
          !user.name ?
            <p className='border-2 border-orange-600 p-1 cursor-pointer px-2 rounded-full' onClick={(e) => setLoginOpen(true)}>Sign in</p>
            : (
              <div className='relative'>
                <img onClick={() => setMenuOpen(!menuOpen)} className='' src={assets.profile_icon} alt="" />
                {
                  menuOpen && (
                    <div className='absolute bg-white p-2 right-0 rounded shadow w-30'>
                      <p onClick={e => navigate('/myorders')} className='hover:text-blue-500 cursor-pointer'>My Orders</p>
                      <hr className='my-2' />
                      <p onClick={handleLogout} className='hover:text-blue-500 cursor-pointer'>Logout</p>
                    </div>
                  )
                }
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Navbar