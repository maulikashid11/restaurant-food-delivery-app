import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Cart from './pages/Cart'
import { Order } from './pages/Order'
import MyOrders from './pages/MyOrders'
import { ToastContainer } from 'react-toastify'
import PaymentSuccess from './pages/PaymentSuccess'
import { PaymentCanceled } from './pages/PaymentCanceled'

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <>
      <div className='sm:w-[90%] w-[98%] mx-auto'>
        <Navbar setLoginOpen={setLoginOpen} />
        <ToastContainer position='bottom-right' />
        {
          loginOpen && <Login setLoginOpen={setLoginOpen} />
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCanceled />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App