import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const { cart, items, removeFromCart, getTotalOfCart } = useContext(AppContext);
  const navigate = useNavigate()
  return (
    <div className='mt-20'>
      {
        Object.keys(cart).length > 0 ?
          (
            <>
              <div className='grid grid-cols-6 text-sm text-gray-500'>
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
              </div>
              <hr className='my-3 text-gray-400' />
            </>
          )
          : <div>No items</div>
      }
      {
        items.map((item, index) => (cart[item._id] > 0 &&
          <div key={item._id}>
            <div className='grid grid-cols-6 text-sm'>
              <img className='w-[50px]' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cart[item._id]}</p>
              <p>${item.price * cart[item._id]}</p>
              <p onClick={() => removeFromCart(item._id)} className='cursor-pointer'>X</p>
            </div>
            <hr className='my-3 text-gray-400' />
          </div>
        ))
      }
      <div className='grid md:grid-cols-2 gap-10 my-10'>
        <div className='md:w-[50%] '>
          <h1 className='text-xl mb-5 font-bold'>Cart Totals</h1>
          <p className='flex justify-between text-gray-500'>Total <span>${getTotalOfCart()}</span></p>
          <hr className='my-2 text-gray-400' />
          <button onClick={() => navigate('/order')} className='bg-orange-500 text-white p-2 rounded text-sm' >PROCEED TO CHECKOUT</button>
        </div>
        <div>
          <p className='font-semibold text-gray-500 '>If you have promo code. Enter if here.</p>
          <div className='flex text-sm my-2'>
            <input className='p-2 border border-gray-500' type="text" placeholder='Promo Code' />
            <button className='px-3 py-2 bg-black text-white font-semibold'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart