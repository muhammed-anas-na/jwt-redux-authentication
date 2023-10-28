import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import genrateToken from '../utils/generateToken.js'

//@desc Auth user / set token
//route POST /api/users/auth
//@access Public
const authUser = expressAsyncHandler(async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        console.log("IFFFFFF" , user.matchPassword(password))
        genrateToken(res,user._id);
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400);
        console.log("Login error throwing hereeee")
        throw new Error("Auth failed");
    }
});

//@desc Admin Login
//route POST /api/users/admin
//@access Public
const adminLogin =expressAsyncHandler (async (req,res)=>{
    const {email,password} = req.body;
    const admin = await User.findOne({email:email , isAdmin:true})
    if(admin && (await admin.matchPassword(password))){
        genrateToken(res,admin._id);
        res.json({
            admin
        })
    }else{
        res.status(400);
        throw new Error("Adming login failed")
    }
})

//@desc Register user / set token
//route POST /api/users
//@access Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const {name,email,password} = req.body
    const userExist = await User.findOne({email})
    console.log("I am here")
    if(userExist){
        res.status(400);
        throw new Error('User already exist');
    }
    const user = await User.create({
        name,
        email,
        password,
    })
    console.log(user)
    if(user){
        genrateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400)
        throw new Error("Invalid user");
    }
});

//@desc Logout user
//route POST /api/users/logout
//@access Private
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt' , '',{
        httpOnly:true,
        expires: new Date(0 )
    })
    res.status(200).json({message:'Logout user'})
});

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }
    res.status(200).json({user});
});

//@desc Update user profile
//route PUT /api/users/profile
//@access Private
const updateuser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
});

//@desc Show users in admin dashboard
//route GET /api/users/admin-dash
//@access Private

const getUser=async(req,res)=>{
    try{
        console.log("Hereee");
        const userData = await User.find({isAdmin:false});
        Object.freeze(userData);
        res.status(200).json({data:userData});
    }catch(err){
        throw new Error("Error");
    }
}

const adminLogout = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt' , '',{
        httpOnly:true,
        expires: new Date(0 )
    })
    res.status(200).json({message:'Logout user'})
});



export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateuser,
    adminLogin,
    getUser,
    adminLogout,
}