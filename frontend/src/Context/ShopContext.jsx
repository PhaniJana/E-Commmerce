import React, {  useEffect, useState } from "react";
import ShopContext from './ShopContextContext'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// 2️⃣ Create the provider component
const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryCharge = 10;
  const backendurl=import.meta.env.VITE_BACKEND_URL
  const[searchBar,setSearchBar]=useState(false)
  const[search,setSearch]=useState('')
  const[cartItem,setCartItem]=useState({}) // cart item will look like {id1:{size:quantity},id2:{size:quantity},....}
  const[products,setProducts]=useState([])
  const [token,setToken]=useState('')
  const navigate=useNavigate()

  const addTocart=async (itemId,size)=>{
    if(!size){
      toast.error('Select Product Size')
      return;
    }
    let cartData=structuredClone(cartItem)
    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size]+=1;
      }
      else{
        cartData[itemId][size]=1;
      }
    }
    else{
      cartData[itemId]={}
      cartData[itemId][size]=1
    }
    setCartItem(cartData)

    //-------------Adding products to DB---------------------------
    if(token){
      try {
        await axios.post(backendurl+'/api/cart/add',{itemId,size},{headers:{token}})
        toast.success('Added to cart')
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
 
  }


  const GetCartcount=()=>{
    let totalcount=0;
    try {
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0) totalcount+=cartItem[items][item]
        }
      }
      
    } catch (error) {
      console.log(error)
    }
    return totalcount;
  }

  const updateQuantity=async(itemId,size,quantity)=>{
    let CartData=structuredClone(cartItem)
    CartData[itemId][size]=quantity
    setCartItem(CartData)
    //-----------------------Adding updated Cart into DB----------------------------
    try {
      await axios.post(backendurl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
      toast.success('Quantity Updated')
    } catch (error) {
      toast.error(error.message)
    }
    
    

  }
  const getCartAmount=()=>{
    try {
      let cartdata=structuredClone(cartItem)
      let totalamount=0;
      
      if (Object.keys(cartdata).length === 0) return 0;

      for(const items in cartdata){
        const product=products.find(item=>item._id===items)
        if (!product) continue;
        
        for(const item in cartdata[items]){
          if(cartdata[items][item]>0){
            totalamount += product.price * cartdata[items][item]
          } 
        }
      }
      return totalamount;
    } catch (error) {
      console.error('Error calculating cart total:', error)
      return 0;
    }
  }

  const GetProductsData=async ()=>{
    try {
      // console.log('Backend URL:', backendurl)
      const response=await axios.get(backendurl+'/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const getUserCart=async(token)=>{
    try {
      const resonse=await axios.post(backendurl+'/api/cart/get',{},{headers:{token}})
      setCartItem(resonse.data.cartData)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    GetProductsData()
  },[])
  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const value = {
    products,
    currency,
    deliveryCharge,
    searchBar,
    setSearchBar,
    search,
    setSearch,
    cartItem,
    setCartItem,
    addTocart,
    GetCartcount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendurl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
