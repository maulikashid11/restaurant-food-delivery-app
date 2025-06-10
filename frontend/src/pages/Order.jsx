import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const Order = () => {
  const [shippingInfo, setShippingInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const [cartItems, setCartItems] = useState([])
  const { cart, items, getTotalOfCart,url } = useContext(AppContext);
  const stripePromise = loadStripe("pk_test_51RNcKIBMuguM6Edy5fOrDypthS2gbPUT8pev4ibZpN4KKkxvYAWWvxELdsu9sjpLUzK6R24weSRmuKSeCUnI8CgF006luhir7D");
  async function makePayment() {


    items.forEach((item) => {
      if (cart[item._id] > 0) {
        const newCartItems = cartItems
        newCartItems.push({
          name: item.name,
          price: item.price,
          quantity: cart[item._id]
        })
        setCartItems(newCartItems)
      }
    })
    let orderData = {
      shippingInfo,
      cartItems
    }
    const res = await fetch(`${url}/api/order/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      credentials: 'include'
    });

    const { sessionId } = await res.json();

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId });
  }

  const changeHandler = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  return (
    <div className='my-2 grid md:grid-cols-2 gap-50'>
      <div className=''>
        <h1 className='mb-5 text-2xl font-bold'>Delivery Information</h1>
        <input onChange={changeHandler} value={shippingInfo.firstname} name='firstname' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="text" placeholder='First Name' />
        <input onChange={changeHandler} value={shippingInfo.lastname} name='lastname' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="text" placeholder='Last Name' />
        <input onChange={changeHandler} value={shippingInfo.email} name='email' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="email" placeholder='Email address' />
        <input onChange={changeHandler} value={shippingInfo.city} name='city' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="text" placeholder='City' />
        <input onChange={changeHandler} value={shippingInfo.zipcode} name='zipcode' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="text" placeholder='Zipcode' />
        <input onChange={changeHandler} value={shippingInfo.country} name='country' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="text" placeholder='Country' />
        <input onChange={changeHandler} value={shippingInfo.phone} name='phone' className='p-1 text-sm border mb-2 rounded border-gray-500 shadow w-full' type="number" placeholder='Phone' />
      </div>
      <div>
        <div className=''>
          <h1 className='text-xl mb-5 font-bold'>Cart Totals</h1>
          <p className='flex justify-between text-gray-500'>Total <span>${getTotalOfCart()}</span></p>
          <hr className='my-2 text-gray-400' />
          <button onClick={() => makePayment()} className='bg-orange-500 text-white p-2 rounded text-sm' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </div>
  )
}
