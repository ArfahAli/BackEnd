// import express from "express";
// import colors from "colors";
// import dotenv from 'dotenv'
// import cors from 'cors';
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import ConnectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// //config env
// dotenv.config();
// // rest objects
// //database connection
// ConnectDB();
// const app = express();

// //middleWare
// app.use(express.json())
// app.use(morgan('dev'))

// //routes
// app.use('/api/v1/auth',authRoutes);

// // rest api
// app.get("/",(req, res)=>{

//     res.send("<h1>Welcome to E-commerce Application - MERN STACK by Arfah Ali</h1>")

// });

// // PORT
// const PORT = process.env.PORT || 5000;

// // run listen

// app.listen(PORT,()=>{

//     console.log(`Server Running on ${PORT}`);

// });

import express from "express";
import product from "./routes/products.js";
import { connection } from "./db/connection.js";
import cors from "cors";
import bodyParser from "body-parser";
import productRouter from "./routes/products.js";
import router from "./routes/Registration.js";
const app = express();
import dotenv from "dotenv";
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/upload", express.static("upload"));
connection
  .then(() => {
    console.log("DB Connected.");
  })
  .catch((e) => {
    console.log(e);
  });
app.use("/", productRouter);
app.use("/AddProduct", productRouter);
app.use("/LoginSignupContainer", router);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started");
});
