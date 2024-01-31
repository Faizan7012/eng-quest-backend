const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const AuthRoute = express.Router();

AuthRoute.post("/signup", async (req, res) => {
    const { email } = req.body;
    const isPresent = await userModel.findOne({ email: email });
    if (isPresent) {
      res.json({ status: false, message: "User already registered!" });
    } 
    else {
        try {
              const newUser = new userModel({
                ...req.body,
              });
              await newUser.save();
              res.json({
                status: true,
                message: "User successfully registered!",
              });
        }
      catch (error) {
        res.json({ status: false, message: error.message });
      }
    }
  });





AuthRoute.post("/login", async (req, res) => {
    const { email } = req.body;
    try {
      const isExist = await userModel.find({ email });
      if (isExist.length ===0) {
        res.json({ status: false, message: "Wrong Credentials" });
      }
       else {
       
                var token = jwt.sign(
                  {
                    userId: isExist[0]._id,
                    role: isExist[0].role,
                    email: isExist[0].email,
                  },
                  'secret_key',
                  { expiresIn: "7d" }
                );
                res.json({
                  status: true,
                  message: "Login successful",
                  token: token,
                  user: isExist[0],
                });
          
      }
    } catch (error) {
      res.json({ status: false, message:error.message });
      
    }
   
  });

module.exports = AuthRoute;