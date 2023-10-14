import  express from "express";
import connectToDB from "./config/dbconnection.js";
import userRoute from './routes/userRoute.js'
const app = express();

connectToDB()

// middleware
app.use(express.json())
app.use('/user',userRoute)

export default app;