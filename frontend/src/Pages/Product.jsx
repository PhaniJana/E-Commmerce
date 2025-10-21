import React, { useContext, useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ShopContext from '../Context/ShopContextContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'
const Product = () => {
  const{productId}=useParams()
  const {products,currency,addTocart}=useContext(ShopContext)
  const[productData,setProductData]=useState(false)
  const[size,setSize]=useState('') // used to select and highlight the size like s,m,xl
  const[image,setImage]=useState('')
  const fetchProductData=async ()=>{
      products.map((item)=>{
        if(item._id===productId){
          setProductData(item);
          setImage(item.image[0])
          return null;//stop executing the function if product is found
        }
      })
  }
  useEffect(()=>{
    fetchProductData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productId,products])
  return productData?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* PRODUCT DATA */}
      <div className='flex gap-4 sm:gap-12 flex-col sm:flex-row'>
        {/* PRODUCT IMAGES */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
          {
            productData.image.map((item,index)=>(
              <img src={item} key={index} onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt="" />
        </div>
        </div> 
        {/* PRODUCT INFO */}
        <div className='flex-1'>
          <h1 className='font-medium mt-2 text-2xl'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>  
          </div>
          <p className='mt-2 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex gap-2 my-8 flex-col'>
            <p>Select Size</p>
            <div className='flex gap-2'>
                {
                  productData.sizes.map((item,index)=>(
                    <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item===size? 'bg-white border-orange-500': ''}`}  key={index}>{item}</button>
                  ))
                }
            </div>
          </div>
          <button onClick={()=>addTocart(productData._id,size)} className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 flex flex-col gap-1 mt-4'>
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>
      </div>
      {/* DESRIPTION AND REVIEW */}
      <div className='mt-20'>
          <div className='flex text-sm cursor-pointer'>
            <p className='py-3 px-5 bg-black text-white font-medium'>Description</p>
            <p className='py-3 border border-gray-500 border-b-0 px-5 bg-white text-black '>Reviews(122)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos recusandae, amet, et soluta quam alias facilis ipsum quaerat repellat cumque maxime neque, blanditiis minus! Mollitia doloribus tenetur unde veniam dolore.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum similique aspernatur, dolorem delectus explicabo nam saepe, natus magnam voluptate nihil minus sit consectetur accusantium dicta. Molestiae impedit excepturi sunt voluptatibus.</p>
          </div>
      </div>
      {/* RELATED PRODUCTS */}
       {/* <div className='flex items-center mt-30 flex-col justify-center text-3xl'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />

       <div className='flex gap-2'>
      {products
      .filter(item => item.category === productData.category && item.subCategory === productData.subCategory).slice(0,5)
      .map((item, index) => (
       <ProductItem
         key={index}
         id={item._id}
         image={item.image}
         name={item.name}
         price={item.price}
        />
     ))}                                                  ***** wrong but my idea ****
      </div>  
      </div> */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      
      
    </div>
  ): <div className='opacity-0'> </div>
}

export default Product