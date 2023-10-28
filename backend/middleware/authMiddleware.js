import expressAsyncHandler from "express-async-handler";
import jwt, { decode } from "jsonwebtoken";
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req,res,next)=>{
    let token;
    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userid).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, invalid token")
        }
    }else{
        res.status(401);
        res.json({message:'Not authorized , Not verified'})
    }
})

export {protect};