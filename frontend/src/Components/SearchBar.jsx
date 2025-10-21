import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../Context/ShopContextContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {searchBar,setSearchBar,search,setSearch}=useContext(ShopContext)
    const[visible,setVisible]=useState(false)
    const location=useLocation();
    useEffect(()=>{
        if(location.pathname.includes('collection') ){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])
   
    
    return searchBar && visible ?(
            <div className='border-t border-b bg-gray-50 text-center flex items-center justify-center gap-2'>
                <div className='inline-flex items-center justify-center border border-color-gray-400 px-5 py-2 my-5 mx-2 rounded-full w-3/4 sm:w-1/2'>
                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search Here' className='outline-none flex-1 px-2 text-sm bg-inherit'/>
                    <img src={assets.search_icon} className='h-4' alt="" />
                </div>
                <img src={assets.cross_icon} onClick={()=>setSearchBar(false)} className='h-4 cursor-pointer' alt="" />

            </div>
    ):null
}

export default SearchBar