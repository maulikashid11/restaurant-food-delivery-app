import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { toast } from 'react-toastify'

const Orders = ({url}) => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetchOrders();
    }, [])
    const fetchOrders = async () => {
        const res = await fetch(`${url}/api/order/get`);
        const data = await res.json();
        if (data.success) {
            setOrders(data.orders);
        }
    }
    const changeHandler = async (e,orderId) => {
        const res = await fetch(`${url}/api/order/updatestatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: e.target.value, orderId })
        })
        const data = await res.json();
        if(data.success){
            toast.success(data.message)
            fetchOrders()
        }
    }
    return (
        <div className="p-10 w-[80%]">
            <p className="mb-5 text-gray-500 font-semibold text-xl">Orders</p>
            {
                orders.filter((order) => order.isPaid === true).map((order) => (

                    <div key={order._id} className=" grid grid-cols-6 p-5 border border-orange-500 items-start ">
                        <img src={assets.parcel_icon} className="w-20" alt="" />
                        <div className="col-span-2">
                            <p className="mb-2 text-gray-700 font-semibold">
                                {order.items.map(item => (
                                    `${item.name} X ${item.quantity}`
                                ))}
                            </p>
                            <div className="text-gray-500">
                                <p className="text-gray-700 font-bold">{order.shippingInfo.firstname + ' ' + order.shippingInfo.lastname}</p>
                                <p>{order.shippingInfo.city},{order.shippingInfo.country},{order.shippingInfo.zipcode}</p>
                                <p>{order.shippingInfo.phone}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 ">Items : {order.items.length}</p>
                        <p className="text-gray-500 ">${order.totalPrice}</p>
                        <select onChange={e => { changeHandler(e, order._id) }} className="border border-orange-500" name="" id="" value={order.shippingStatus}>
                            <option hidden value="Food Processing">Food Processing</option>
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Out Of Stock">Out of Stock</option>
                        </select>
                    </div>
                ))
            }

        </div>
    )
}

export default Orders