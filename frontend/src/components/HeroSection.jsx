const HeroSection = () => {
  return (
    <div className='relative '>
      <div className="img relative z-1 ">
        <img className='rounded-xl w-full h-full' src={"https://asliceofpi.ca/wp-content/uploads/2017/04/17.jpg"} alt="" />
      </div>
      <div className="content absolute bottom-3 left-5 z-5 text-white">
        <h1 className='text-2xl mb-2 font-bold lg:text-6xl sm:text-4xl'>Order Your <br /> Favourite Food <br /> Here</h1>
        <p className='text-md my-5 font-bold hidden md:block'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quo aut. <br /> Accusantium quam delectus, autem dolorum exercitationem fuga omnis maiores?</p>
        <button className='bg-white px-5 py-2 font-semibold text-black rounded-full'>View Menu</button>
      </div>
    </div>
  )
}

export default HeroSection