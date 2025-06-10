import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const url = 'https://restaurant-food-delivery-app-dwaj.onrender.com'
    const [cart, setCart] = useState({})
    const [items, setItems] = useState([])
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    const fetchCart = async () => {
        const res = await fetch(`${url}/api/cart/get`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            setCart(data.cartItems);
        }
    }
    const fetchItems = async () => {
        const res = await fetch(`${url}/api/menu/get`);
        const data = await res.json();
        if (data.success) {
            setItems(data.menuItems);
        }
    }
    const fetchUser = async () => {
        const response = await fetch(`${url}/api/user/get`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const data = await response.json();
        if (data.success) {
            setUser(data.user);
        }
    }
    const fetchOrders = async () => {
        const response = await fetch(`${url}/api/order/getbyid`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        const data = await response.json();
        if (data.success) {
            setOrders(data.orders);
        }
    }
    useEffect(() => {
        fetchUser()
        fetchCart()
        fetchItems()
        fetchOrders()
    }, [])

    const addToCart = async (itemId) => {
        const res = await fetch(`${url}/api/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            fetchCart()
        }
    }
    const removeFromCart = async (itemId) => {
        const res = await fetch(`${url}/api/cart/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            toast.success(data.message);
            fetchCart()
        }
    }
    const getTotalOfCart = () => {
        let totalAmount = 0
        items.map((item) => {
            if (cart[item._id] > 0) {
                totalAmount = item.price * cart[item._id] + totalAmount
            }
        })
        return totalAmount
    }
    const value = { cart, setCart, addToCart, removeFromCart, getTotalOfCart, items, user,setUser, orders, fetchOrders, fetchCart,url }
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}