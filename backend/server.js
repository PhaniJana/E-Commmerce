import express from 'express' // to use import statements go to package.json and add type:module below "main" run command "npm run server"
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectClodinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import ordersRouter from './routes/orderRoute.js'

const app=express()
const port=process.env.PORT || 3000

//Middle Ware  
app.use(express.json()) // Converts the incoming req into json
app.use(cors()) // we can access backend from any IP
await connectDB()
await connectClodinary() // await pettakapovadam chala badha pettindi

//API END POINTS

app.use('/api/user', userRouter)
app.use('/api/product',productRouter)   
app.use('/api/cart',cartRouter)
app.use('/api/orders',ordersRouter)

app.get('/',(req,res)=>{
    res.send('Api working')
})


app.listen(port,()=>{
    console.log('server running in the port http://localhost:3000')
})