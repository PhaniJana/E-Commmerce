import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { backendURL,currency } from '../BackendUrl'
import axios from 'axios'
import {assets} from '../assets/assets.js'

const Orders = ({token}) => {
  const [orders,setOrders]=useState([])
  //USed to fretch orders from DB
  const fetchOrders=async()=>{
    if(!token){
      return null
    }
    try {
      const response=await axios.post(backendURL+'/api/orders/list',{},{headers:{token}})
      if(response.data.success){
        // console.log(response.data)
        setOrders(response.data.orders)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[token])

  // Used to Update Orders Status
  const StatusHandler=async(e,orderId)=>{
    try {
      const response=await axios.post(backendURL+'/api/orders/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchOrders()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />

              <div>
              <div>{order.items.map((item,index)=>{
                if(index===order.items.length-1){ //last item
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                }
                else{
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size},</span></p>
                }
              })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstname+" "+order.address.lastname}</p>
              <div>
                <p>{order.address.street+","}</p>
                
                <p>{order.address.city + ", " + order.address.country+ ", " + order.address.pincode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Item : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment :{order.payment? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(e)=>StatusHandler(e,order._id)} className='p-2 font-semibold' value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders