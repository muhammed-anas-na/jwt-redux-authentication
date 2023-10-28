import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {    
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateuser,
    adminLogin,
    getUser,
    adminLogout

} from "../Controller/userController.js";
const router = express.Router()


router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateuser);
router.post('/admin',adminLogin)
router.get('/admin-dash',getUser)
router.post('/adminLogout' , adminLogout)


export default router