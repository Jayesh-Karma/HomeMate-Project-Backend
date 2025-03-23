const generateToken = require("../utils/generateToken");
const adminModel = require("./adminModel");
const mongoose = require("mongoose");

const adminRegistration = async(req,res) =>{
    try{
        const {name, email , password, phone }  = req.body;
        if(!name || !email || !password || !phone){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        const adminCheck = await adminModel.findOne({email, phone});

        if(adminCheck){
            return res.status(400).json({
                success:false,
                message:"Admin already exist"
            })
        }

        const saveAdmin = await adminModel.create({
            name, email, password, phone
        })

        if(saveAdmin){
            return res.status(200).json({
                success:true,
                message:" Admin registration successfully"
            })
        }
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "Admin registration failed, try again later",
            error:error.message
        })
    }
}



const adminLogin = async(req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email or password is incorrect"
            });
        }

        const findAdmin = await adminModel.findOne({email});
        if(!findAdmin){
            return res.status(400).json({
                success:false,
                message: "Admin not found"
            })
        }

        const checkPass = await findAdmin.matchPassword(password);
        if(!checkPass){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
            const token = generateToken(findAdmin);
                  
            return res.status(200).json({
                success:true,
                message:"Admin Login successfull",
                adminData:{
                    id:findAdmin._id,
                    name:findAdmin.name,
                    email:findAdmin.email,
                    phone:findAdmin.phone,
                    token:token
                }
            })
        


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message: "Admin login failed, try again later",
            error:error.message
        })
    }
}


module.exports = {adminRegistration, adminLogin};