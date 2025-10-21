import React from 'react'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import NewsLetter from '../Components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t"><Title text1={'CONTACT'} text2={'US'}/></div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col  justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>16.8916° N, 81.9251° E <br /> Andhra Pradesh,India</p>
          <p className='text-gray-500'>(Tel): +91 8328124133 <br /> Email: phanijana5@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at FOREVER</p>
          <p className='text-gray-500'>Learn More About our Teams and job Openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

      </div>
      <NewsLetter/>
    </div>
  )
}

export default Contact