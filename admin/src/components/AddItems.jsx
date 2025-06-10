import React, { useState } from 'react'
import { assets } from "../assets/assets"
import { toast } from 'react-toastify'

const AddItems = ({url}) => {
    
    const [details, setDetails] = useState({
        name: '',
        description: '',
        category: "",
        price: "",
        file: ""
    })
    const changeHandler = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { name, description, category, price, file } = details
            const formData = new FormData();
            formData.append('name', name)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('price', price)
            formData.append('file', file)

            const res = await fetch(`${url}/api/menu/add`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="md:w-[70%] mx-auto pt-10 text-gray-500 font-semibold">
            <p>Upload Image</p>
            <label htmlFor="file" className='w-30 h-20'>
                <img className='w-30 h-20' src={details.file.name ? URL.createObjectURL(details.file) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setDetails({ ...details, file: e.target.files[0] })} type="file" id="file" name='file' className="hidden" />
            <label className="mt-5 block" htmlFor="name">Product Name</label>
            <input onChange={changeHandler} value={details.name} className="p-1 border border-gray-500 my-2" name='name' type="text" placeholder="type here" />
            <label className="mt-5 block" htmlFor="description">Product description</label>
            <textarea onChange={changeHandler} value={details.description} className="p-1 border border-gray-500 my-2" name="description" id="description" placeholder="Write content here"></textarea>
            <div className="flex my-2 gap-10">
                <div>
                    <label className="block" htmlFor="category">Product Category</label>
                    <select onChange={changeHandler} value={details.category} name="category" className="border w-full my-2" id="category">
                        <option value="default">Select a category</option>
                        <option value="Salad" >Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div>
                    <label className="block" htmlFor="price">Product Price</label>
                    <input onChange={changeHandler} value={details.price} type="number" className="border  my-2" name='price' placeholder="$20" />
                </div>
            </div>
            <button className="bg-black text-white font-semibold p-2 px-4">Add</button>
        </form>
    )
}

export default AddItems