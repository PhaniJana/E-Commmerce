import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../Context/ShopContextContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const {token,setToken,navigate,backendurl}=useContext(ShopContext)

  const[currentState,setCurrentState]=useState('Log In')
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const onSubmitHandler= async (e)=>{
        e.preventDefault()
        try {
          if(currentState==='Sign Up'){
            const response=await axios.post(backendurl+'/api/user/register',{name,email,password})
            console.log(response.data)
            if(response.data.success){
              setToken(response.data.token)
              localStorage.setItem('token',response.data.token)
            }
            else{
              toast.error(response.data.message)
            }
          }
          else{
            const response=await axios.post(backendurl+'/api/user/login',{email,password})
            console.log(response.data)
            if(response.data.success){
              setToken(response.data.token)
              localStorage.setItem('token',response.data.token)
            }
            else{
              toast.error(response.data.message)
            }

          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 '/>
      </div>
      {currentState==='Log In'?'': <input type="text" className='w-full px-3 py-2 border border-gray-800 ' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='E-mail' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className=''>{currentState==='Log In'? 'Forgot your Password?' : 'Already had an Account?'}</p>
        
        {
          currentState==='Log In'? 
          <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p>
          :
          <p className='cursor-pointer' onClick={()=>setCurrentState('Log In')}>Log In Here</p>
        }
      </div>
      <button className='px-8 font-light mt-4 py-2 bg-black text-white'>{currentState==='Log In'? 'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login