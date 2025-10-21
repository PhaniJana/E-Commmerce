import React from 'react'

const NewsLetter = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% off</p>
        <p className='my-2 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt adipisci consequuntur nobis sequi </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
            <input type="email" placeholder='Enter your zoho mail' className='p-3 w-full sm:flex-1 outline-none' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter