import express from 'express'
import {placeOrder,placeOrdeStripe,placeOrderRazorPay,Allorders,userOrders,updateStatus} from '../controllers/orderController.js'
import AdminAuth from '../middleware/AdminAuth.js'
import authUser from '../middleware/Auth.js'
const ordersRouter=express.Router()

//Admin
ordersRouter.post('/list',AdminAuth,Allorders)
ordersRouter.post('/status',AdminAuth,updateStatus)

//Payment
ordersRouter.post('/place',authUser,placeOrder)
ordersRouter.post('/stripe',authUser,placeOrdeStripe)
ordersRouter.post('/razor',authUser,placeOrderRazorPay)

//user orders
ordersRouter.post('/userorders',authUser,userOrders)



export default ordersRouter