const { response } = require("express");
const Customer = require("../../models/customer");
const { customerWelcomeMail } = require("../../utils/Email Templates/customerSignup");
const { newHireNotification } = require("../../utils/Email Templates/newHireNotification");
const emailSender = require("../../utils/emailSender");
const generateToken = require("../../utils/generateToken");
require("dotenv").config();


// note :--->> flow is like , customer is free to visit all things and see all things but before hiring they have to signup
const signupCustomer = async(req, res) => {
    try {
        const { name, email, phone, location, password } = req.body;

        if(!name || !email || !phone || !location || !password ){
            return res.status(400).json({
                success:false,
                message:"Required all fields"
            })
        }

        const newCustomer = await Customer.create({
            name, email, phone, location, password
        })
        
        await emailSender(newCustomer.email, "Signup successfull- Welcome to HomeMate!", "", customerWelcomeMail(newCustomer.name))

        return res.status(200).json({
            success:true,
            message:"Signup successfull",
            userData: newCustomer
        })
       
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Failed to signup try again ---> server errror"
        })
    }
}



//login controller 
const loginCustomer = async(req, res) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Required all fields"
            })
        }

        const checkDetails = await Customer.findOne({email});
        const checkPass = await checkDetails.matchPassword(password);
        
        if(!checkPass){
            return res.status(400).json({
                success:false,
                message:"Wrong Password try again later"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Login Successfull",
            userData:checkDetails,
            token:generateToken(checkDetails)
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Login Failed try again later ---> server eror"
        })
    }
}