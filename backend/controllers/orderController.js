import orderModel from "../models/orderModel.js"
import userModel from "../models/UserModel.js"

//Orders using COD
const placeOrder=async (req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}}) // Clearing cart After the order is placed
        console.log('order placed success');
        
        res.json({success:true,message:'Order Placed'})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
        
    }
}

//Orders using Stripe
const placeOrdeStripe=async (req,res)=>{

}

//Orders using razor pay
const placeOrderRazorPay=async (req,res)=>{

}

//All orders for Admin panel
const Allorders=async (req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}


//User order for FrontEnd
const userOrders=async (req,res)=>{
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId}) // type(order)-array
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//Update order Status for Admin panel
const updateStatus=async (req,res)=>{
    try {
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status updated'})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}


export{placeOrder,placeOrdeStripe,placeOrderRazorPay,Allorders,userOrders,updateStatus}