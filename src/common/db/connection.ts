import mongoose from "mongoose";
import { ENV } from "../config/config";

export async function connectDB() {
    try{
        mongoose.set("debug",true);
        await mongoose.connect(ENV.DB_URL);
        console.log("connected db")
    }
    catch(e){
        console.log(e)
    }

}