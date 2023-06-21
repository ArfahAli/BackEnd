import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const url = "mongodb+srv://Arfah:12345@cluster0.vzjaqle.mongodb.net/ecommerce";
 
export const connection = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("MongoDB connected"));

