import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './Routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config()
import connectDB from './Database/connection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectDB();
const port = process.env.port   || 5000    
const app = express();

app.use(cors())
// Use cookie-parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/' , (req,res)=>res.send("Server is running"))
app.use('/api/users' , userRoutes)


//Error handler middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>console.log(`Server stated ${port}`))