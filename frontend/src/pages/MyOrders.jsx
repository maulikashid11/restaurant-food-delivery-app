import { useContext, useState } from "react";
import { assets } from "../assets/assets"
import { useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const MyOrders = () => {

  const { orders, fetchOrders, fetchCart } = useContext(AppContext);
  useEffect(() => {
    fetchCart()
    fetchOrders()
  }, [])
  return (
    <div>
      <h1 className="text-2xl">My Orders</h1>
      {
        orders.length ?
          orders.filter((order) => order.isPaid === true).map((order) => (
            <div key={order._id} className="p-2 my-5 border border-orange-500 grid grid-cols-3 sm:grid-cols-6 gap-5 items-center ">
              <img className="" src={assets.parcel_icon} alt="" />
              <p className="text-xs">
                {order.items.map(item => (
                  `\n${item.name} X ${item.quantity},\n\n`
                ))}
              </p>
              <p>${order.totalPrice}</p>
              <p>Items:{order.items.length}</p>
              <p>{order.shippingStatus}</p>
              <p onClick={(e) => fetchOrders()} className="bg-orange-300 cursor-pointer p-2 text-center">Track Order</p>
            </div>
          ))
          : <div>No order yet</div>
      }
    </div>
  )
}

export default MyOrders