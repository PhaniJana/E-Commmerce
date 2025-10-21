import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../BackendUrl'
import {toast} from 'react-toastify'

const List = ({token}) => {
  const [list,setList]=useState([])

  const fetchlist=async ()=>{
    try {
      const response=await axios.get(backendURL+'/api/product/list')
      if(response.data.success){
      // console.log(response.data)
      setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backendURL+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchlist()
      }
      else{
        toast.error(response.data.message)
      }
      
      console.log(response)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    fetchlist()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <p>All Products List</p>
      <div>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
      </div>
      <div>
        {/**--------- Product List------------ */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-1 py-2 text-sm' key={index}>
              <img className='w-12' src={item.image?.[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='cursor-pointer text-lg text-center' onClick={()=>removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List