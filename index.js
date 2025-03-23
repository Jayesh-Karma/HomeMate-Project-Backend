const dotenv  = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const adminRoutes = require("./Admin/adminRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const searchRoutes = require("./routes/searchRoutes.js");

dotenv.config();

// middlewares -->
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5176'],  // Only allow this domain to make requests
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true  // Allowed headers
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res) =>{
    res.send("Welcome to Homemate")
})

// connect with database ---<
const mongo = require("./Database/connection");
const morgan = require("morgan");
mongo.connection


// all routes ->
    // admin routes
    app.use("/admin", adminRoutes)

    // servcie providers auth and all routes
    app.use("/service", authRoutes)

    //search apis to search different things
    app.use("/search", searchRoutes)

// listening to port here ---->
app.listen( process.env.PORT, ()=>{
    console.log("Server started successfully at port "+  process.env.PORT)
})
