import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AddItems from './components/AddItems'
import ListItems from './components/ListItems'
import Orders from './components/Orders'
import { assets } from './assets/assets'
import { ToastContainer } from 'react-toastify'

function App() {
  const url = 'https://restaurant-food-delivery-app-dwaj.onrender.com'

  return (
    <>
      <Navbar />
      <ToastContainer position='bottom-right' />
      <div className='flex '>
        <div className='flex flex-col items-end w-50 border-r-2 h-[88vh]'>
          <NavLink to="/" className={({ isActive }) => `flex gap-5 p-2 border w-40 my-5 ${isActive ? 'border-orange-500 bg-orange-200' : 'border-gray-500'}`}>
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>
          <NavLink to="/listitems" className={({ isActive }) => `flex gap-5 p-2 border w-40 my-5 ${isActive ? 'border-orange-500 bg-orange-200' : 'border-gray-500'}`}>
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `flex gap-5 p-2 border w-40 my-5 ${isActive ? 'border-orange-500 bg-orange-200' : 'border-gray-500'}`}>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>
        </div>
        <Routes>
          <Route path='/' element={<AddItems url={url} />} />
          <Route path='/listitems' element={<ListItems url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
