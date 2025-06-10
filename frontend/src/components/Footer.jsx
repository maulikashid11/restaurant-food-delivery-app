import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='bg-zinc-800 text-white p-5'>
            <div className='grid grid-cols-3 justify-center  '>
                <div className='flex flex-col gap-2'>
                    <img className='w-[150px]' src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores culpa magnam aspernatur.</p>
                    <div className='flex gap-2'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className=''>
                    <p className='text-2xl'>COMPANY</p>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-2xl'>GET IN TOUCH</p>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr className='my-5 text-gray-500'/>
            <p className='text-center'>All copyrights reserved | 2025</p>
        </div>
    )
}

export default Footer