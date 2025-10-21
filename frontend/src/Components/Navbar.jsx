import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import ShopContext from '../Context/ShopContextContext';

const Navbar = () => {
    const[visible,setVisible]=useState(false);
    const{searchBar,setSearchBar,GetCartcount,token,setToken,navigate,setCartItems}=useContext(ShopContext)

    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }
    return (
        <div className='relative flex items-center justify-between py-5 font-medium '>
       <Link to='/'><img src={assets.logo} alt="" className='w-36' /></Link> 
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collections' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 '>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} onClick={()=>setSearchBar(!searchBar)}className='w-5 cursor-pointer' alt="" />
        <div className='group relative cursor-pointer'>

           <img onClick={()=>token? null: navigate('/login')} src={assets.profile_icon} className='w-5' alt="" />
           {/**Drop Down for profile */}
           {token && <div className='group-hover:block hidden absolute dropdown-menu pt-4 left-1/2 transform -translate-x-1/2'>
                <div className='flex flex-col gap-2 w-36 bg-slate-100 py-3 px-5 text-gray-500 rounded'>
                <p className='hover:text-black'>My Profile</p>
                <p className='hover:text-black' onClick={()=>navigate('/orders')}>Orders</p>
                <p className='hover:text-black' onClick={logout}>Log Out</p>
                </div>
                
            </div>}
            
        </div>
        <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 ' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{GetCartcount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='sm:hidden w-4 cursor-pointer' alt="" />
                <div className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* menu for small screen*/}
                    <div className='flex flex-col text-gray-600 h-full'>
                        {/*back button*/}
                        <div onClick={()=>setVisible(false)} className='flex items-center gap-2 p-3 cursor-pointer m-1'>
                                <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                                <p>BACK</p>
                        </div>
                        <NavLink to='/' onClick={()=>setVisible(false)}className='py-2 pl-6 border-b border-t'>
                            <p>HOME</p>
                        </NavLink>
                        <NavLink to='/collections' onClick={()=>setVisible(false)} className='py-2 pl-6 border-b'>
                            <p>COLLECTION</p>
                        </NavLink>
                        <NavLink to='/about' onClick={()=>setVisible(false)} className='py-2 pl-6 border-b'>
                            <p>ABOUT</p>
                        </NavLink>
                        <NavLink to='/contact' onClick={()=>setVisible(false)} className='py-2 pl-6 border-b '>
                            <p>CONTACT</p>
                        </NavLink>

                    </div>
                </div>
      </div>
    </div>
  )
}

export default Navbar