import mongoose from "mongoose";

const connectDB =async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://anasna6005:lUSAfWoHBViG8vmZ@cluster0.ijnvw0i.mongodb.net/mern?retryWrites=true&w=majority')
        console.log(`MongoDb connected :${conn.connection.host}`)
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

export default connectDB;