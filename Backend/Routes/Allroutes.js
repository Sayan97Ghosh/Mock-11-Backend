const express = require('express');
// const { resetWatchers } = require('nodemon/lib/monitor/watch');
const { AuthsModel } = require('../Modules/Logmodules');
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config()
// this is get req
authRouter.get("/",(req,res)=>{
    res.send("THis is get req");
})


// this is for sign up
authRouter.post("/signup",async (req,res)=>{
    const { email, password } = req.body;
    // const ip = req.ip;
    // const time =new Date();
   
    try {
      const userPresent = await AuthsModel.findOne({ email });
      if (userPresent) {
        res.send("Already registered");
      } else {
        bcrypt.hash(password, 5, async function (err, hash) {
          const userDetails = new AuthsModel({ email, password: hash});
          await userDetails.save();
          console.log("data is added");
          res.send("signup successful");
        });
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
      console.log("data adding failed");
    }
    
})
// this is for login
authRouter.post("/login",async (req,res)=>{
    const { email, password } = req.body;
  try {
    const user = await AuthsModel.find({ email });
    const hashed_password = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "shhh");
          res.send({ message: "login successful ", token: `${token}` });
        } else {
          res.send("login failed");
        }
      });
    } else {
      res.send("login failed");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
    console.log("data adding failed");
  }
   
})

module.exports = {authRouter};