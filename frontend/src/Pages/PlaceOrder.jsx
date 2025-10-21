import React, { useContext, useState } from 'react'
import CartTotal from '../Components/CartTotal'
import Title from '../Components/Title'
import ShopContext from '../Context/ShopContextContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
  const [select, setSelect] = useState('cod')
  const { navigate,backendurl,token,cartItem,setCartItem,getCartAmount,deliveryCharge,products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      let orderItems=[]
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+deliveryCharge
      }

      switch(select){
        //API calls for cod
        case 'cod': 
            {const response=await axios.post(backendurl+'/api/orders/place',orderData,{headers:{token}})
            console.log(response.data.success)
            if(response.data.success){
              setCartItem({})
              navigate('/orders')
            }else{
              toast.error(response.data.message)
            }
            break
          }
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row border-t gap-40 items-start'>

      {/* DELIVERY INFORMATION */}
      <div className='text-xl mt-10 flex flex-col flex-1 mr-4 p-3 sm:text-2xl'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        <div className='flex flex-col mt-3 gap-2'>
          <div className='text-sm flex gap-1'>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={onChangeHandler}
              placeholder='First Name'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={onChangeHandler}
              placeholder='Last Name'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder='Enter your zoho mail'
            className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300 text-sm'
            required
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder='Street'
            className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300 text-sm'
            required
          />

          <div className='text-sm flex gap-1'>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder='City'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder='State'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
          </div>

          <div className='text-sm flex gap-1'>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              placeholder='Pin Code'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder='Country'
              className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300'
              required
            />
          </div>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder='Phone'
            className='p-1 sm:p-2 flex-1 outline-none border rounded-sm border-gray-300 text-sm'
            required
          />
        </div>
      </div>

      {/* CART + PAYMENT */}
      <div className='flex-1 mt-10'>
        <div className='py-2'>
          <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTAL'} />
          </div>
          <hr />
          <CartTotal />
        </div>
        <hr />
        <div className='mt-5'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-2 flex-1 flex-col sm:flex-row'>

            <div
              className='flex items-center gap-2 border border-gray-200 py-1 px-3 sm:px-4 cursor-pointer'
              onClick={() => {
                setSelect('stripe')
                toast.error('Please Select COD')
              }}
            >
              <div className={`inline-flex border rounded-full w-3 h-3 border-gray-200 ${select === 'stripe' ? 'bg-green-400' : ''}`}></div>
              <span>STRIPE</span>
            </div>

            <div
              className='flex items-center gap-2 border border-gray-200 py-1 px-3 sm:px-4 cursor-pointer'
              onClick={() => {setSelect('razorpay') 
                toast.error('Please Select COD')}}
            >
              <div className={`inline-flex border rounded-full w-3 h-3 border-gray-200 ${select === 'razorpay' ? 'bg-green-400' : ''}`}></div>
              <span>RAZOR PAY</span>
            </div>

            <div
              className='flex items-center gap-2 border border-gray-200 py-1 px-3 sm:px-4 cursor-pointer'
              onClick={() => setSelect('cod')}
            >
              <div className={`inline-flex border rounded-full w-3 h-3 border-gray-200 ${select === 'cod' ? 'bg-green-400' : ''}`}></div>
              <span>CASH ON DELIVERY</span>
            </div>
          </div>
        </div>

        <button className='py-2 px-10 bg-black text-white mt-10 sm:ml-78 text-sm rounded-md'>PLACE ORDER</button>
      </div>

    </form>
  )
}

export default PlaceOrder
