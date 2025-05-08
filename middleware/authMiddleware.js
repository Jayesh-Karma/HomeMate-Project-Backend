const jwt = require('jsonwebtoken');
const User = require("../models/user");
const user = require('../models/user');
const Customer = require('../models/customer');

const checkUser = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await user.findById(decoded.id).select('-password');
      // console.log(req.user)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed', error:error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const checkCustomer = async(req, res, next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await Customer.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Error in login try again later", error);
      res.status(401).json({
        success:false,
        message:"Token Failed"
      })
    }
  }
  if(!token){
    res.status(401).json({
      success:false,
      message:"No token found, login first"
    })
  }
}


module.exports = { checkUser, checkCustomer };
