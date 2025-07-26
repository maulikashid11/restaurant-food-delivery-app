import { assets } from "../assets/assets"

const Navbar = () => {
  return (
    <div className="px-5 py-2 flex justify-between items-center border-b-2 border-gray-300">
      <h1 className="w-30 font-bold text-2xl">FavFood</h1>
      <img className="w-10" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar