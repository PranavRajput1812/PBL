import app from './app.js'
import { config } from "dotenv";
config()
const PORT = process.env.PORT||3800;

app.listen(PORT,()=>{
    console.log(`Server listen at Port : ${PORT}`);
})