import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ListItems = ({url}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems()
  }, [])
  const fetchItems = async () => {
    const res = await fetch(`${url}/api/menu/get`);
    const data = await res.json();
    if (data.success) {
      setItems(data.menuItems);
    }
  }
  const deleteItem = async (itemId) => {
    const res = await fetch(`${url}/api/menu/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemId})
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
    }
  }
  return (
    <div className='w-[80%] p-10'>
      <p className='my-3 text-gray-500 font-semibold'>All Foods List</p>
      <div className=' border border-gray-500 p-2 grid grid-cols-6 gap-3 text-sm font-semibold text-gray-500'>
        <p>Image Action</p>
        <p className='col-span-2'>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {
        items.map((item) => (
          <div key={item._id} className='w-full border border-gray-500 p-2 grid grid-cols-6 gap-3 text-sm font-semibold text-gray-400 justify-center items-center'>
            <img src={item.image} className='w-20' alt="" />
            <p className='col-span-2'>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => { deleteItem(item._id) }} className='cursor-pointer'>X</p>
          </div>
        ))
      }

    </div>
  )
}

export default ListItems