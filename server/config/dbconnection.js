import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectToDB = async()=>{
    try {
        const{connection} = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected with Database :${connection.host}`);
    } catch (error) {
        console.log(error.message);

    }
}

export default connectToDB;
