import dotenv from "dotenv";
import { MongooseError } from "mongoose";


dotenv.config();

if (!process.env.MONGO_URI) {
    throw new MongooseError("MONGO_URI is not defined in env variables");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    QUICK_COMMERCE_API_BASE_URL: process.env.QUICK_COMMERCE_API_BASE_URL
}



export default config;