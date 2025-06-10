import { useContext, useEffect, useState } from "react"
import { assets, food_list, menu_list } from "../assets/assets"
import { AppContext } from "../contexts/AppContext"

const MenuSection = () => {
    const [category, setCategory] = useState('')
    const { cart,setCart,addToCart, removeFromCart, items} = useContext(AppContext);
    
    
    return (
        <div className="mt-10">
            <h1 className="text-4xl ">Explore our menu</h1>
            <p className="text-gray-500 md:text-lg my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum quo consequatur veniam illo voluptatum tempora! Tenetur accusamus repudiandae officia placeat.</p>
            <div className="menu-section flex gap-15 overflow-x-scroll mt-5">
                {
                    menu_list.map((menu, index) =>
                        <div key={index} className="menu shrink-0">
                            <img className={`rounded-full cursor-pointer ${category === menu.menu_name && 'border-2 border-orange-500 p-1'} w-[100px] h-[100px]`} onClick={(e) => setCategory(menu.menu_name)} src={menu.menu_image} alt="" />
                            <p className="font-bold text-center my-2 text-md text-gray-500">{menu.menu_name}</p>
                        </div>
                    )
                }
            </div>
            <hr className="my-10 text-gray-400" />
            <h1 className="my-5 text-4xl">Top dishes near you</h1>
            <div className="food-section  grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    items.filter((item) => item.category.includes(category)).map((item, index) =>
                        <div key={index} className="rounded-xl max-w-[300px] overflow-hidden">
                            <div className="relative">
                                <img className="" src={item.image} alt="" />
                                <div className="absolute right-5 bottom-5 z-5">
                                    {
                                        !cart[item._id]>0 ?
                                        (<img className=" w-[40px]" onClick={() => addToCart(item._id)} src={assets.add_icon_white} alt="" />)
                                        :
                                    (<div className="flex  bg-white rounded-full items-center justify-center gap-3 ">
                                        <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                                        <p>{cart[item._id]}</p>
                                        <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                                    </div>)
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className="text-xl font-semibold">{item.name}</p>
                                <img className="w-[70px] h-[15px]" src={assets.rating_starts} alt="" />
                            </div>
                            <p className="text-md text-gray-500">{item.description}</p>
                            <p className="text-2xl text-orange-500">${item.price}</p>
                        </div>
                    )
                }
            </div>
            <div className="mt-15">
                <p className="text-4xl font-bold">Experience authentic foods. tomato is best platform for you.</p>
                <div className="flex my-10 items-center justify-center gap-10">
                    <img src={assets.play_store} alt="" />
                    <img src={assets.app_store} alt="" />
                </div>
            </div>
        </div>
    )
}

export default MenuSection