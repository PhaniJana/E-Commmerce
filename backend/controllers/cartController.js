import userModel from "../models/UserModel.js";



//add Products to user cart
const addToCart=async (req,res)=>{
    try {
        const {userId,itemId,size}=req.body;
        const user=await userModel.findById(userId)
        
            let cartData=await user.cartData;
            if(cartData[itemId]){
                if(cartData[itemId][size]){
                    cartData[itemId][size]+=1;
                }
                else{
                    cartData[itemId][size]=1;
                }
            }
            else{
                cartData[itemId]={};
                cartData[itemId][size]=1;
            }

            await userModel.findByIdAndUpdate(userId,{cartData})
            res.json({success:true,message:'Added to cart'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//Update  user cart
const updateCart=async (req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body;
        const user=await userModel.findById(userId)
        let cartData=await user.cartData;
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:'Cart Updated'})


    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// get cart data
const getUserCart=async (req,res)=>{
    try {
        const {userId}=req.body
        const user=await userModel.findById(userId)
        let cartData=await user.cartData
        res.json({success:true,cartData})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


export {addToCart,updateCart,getUserCart}