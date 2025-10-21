import jwt from 'jsonwebtoken'


const AdminAuth=(req,res,next)=>{
    try{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:'User Not Authorized'})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD!==decoded){
        return res.json({success:false,message:'Access Denied'})
    }
    next()
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export default AdminAuth