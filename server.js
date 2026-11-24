const express = require("express");
const dotenv=require("dotenv");
dotenv.config();
const cors = require("cors");

const {connection} = require("./db");
const {userRouter} = require("./userRouter");
const { auth } = require("./auth.middleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "coding";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
// server.js mein aisa hona chahiye:
// app.use("/api", authRoutes);

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Yahan apna User Model use karein (jaise User.create({...}))
    // Example response:
    res.status(201).json({ message: "User registered successfully", token: "sample_token_or_jwt" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// 2. Signin Route
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Yahan user check karein aur token generate karein
    res.status(200).json({ message: "Login successful", token: "sample_token_or_jwt" });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
});
app.get("/home", (req,res)=>{
    res.send({msg:"Welcome to note application"})
});

// auth middleware
app.use(auth);

// private route
app.get("/dashboard", (req, res)=>{
    res.send({msg: "Welcome to Note Application"});
});

app.listen(8080, async()=>{

    try{
        await connection;
        console.log("DB connected");

    } catch(error){
        console.log("error", error.message);
    }
    console.log("Server connected");
});