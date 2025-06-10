import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../contexts/AppContext'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const orderId = new URLSearchParams(useLocation().search).get('orderId')
  const { url } = useContext(AppContext)
  useEffect(() => {
    updateIsPaid()
  })
  const updateIsPaid = async () => {
    const response = await fetch(`${url}/api/order/updatepaid`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderId }),
      credentials: "include"
    })
    const data = await response.json();
    if (data.success) {
      toast.success('payment successfully done');
      setTimeout(() => {
        navigate('/myorders')
      }, 2000)
    }
  }
  return (
    <div className='py-10 px-5 text-3xl'>Payment successful</div>
  )
}
