import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    
    <div >
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className=''>
            <img src={assets.logo} className='w-32 mb-5 ' alt="" />
            <p className='w-full sm:w-2/3 text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam officiis enim accusantium, aut dolorem deleniti nobis culpa earum natus voluptates nihil iure sunt atque tenetur, asperiores eveniet id, vitae voluptatem.</p>
        </div>
        <div>
            <p className='text-black mb-5 text-xl font-medium'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-black mb-5 text-xl font-medium'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 8328124133</li>
                <li>phanijana5@gmail.com</li>
                <li className='cursor-pointer'>LinkedIn</li>
            </ul>
        </div>
        
        </div>
        <div>
            <hr className='text-gray-200'/>
            <p className='text-black text-sm text-center py-5'>Copyright 2025@ Phani Jana - All Right Reserved.</p>
        </div>

        
    </div>
    
  )
}

export default Footer