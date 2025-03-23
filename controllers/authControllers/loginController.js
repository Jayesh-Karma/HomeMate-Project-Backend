const user = require("../../models/user");
const generateToken = require("../../utils/generateToken");



const registerUser = async(req, res) =>{
    const {name, email, password, role, serviceDetails, phone, city} = req.body;

    if(!name || !email || !password || !role || !serviceDetails || !phone || !city){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
        })
    }


    const userExists = await user.findOne({email:email, phone:phone});

    if(userExists){
        return res.status(400).json({
         success:false,
         message:"User Already registered"
        })
    }

    const savingUser = await user.create({
        name, email, password, role, serviceDetails, phone, city
    })

    if(!savingUser){
        return res.status(400).json({
            success:false,
            message:"Registration failed, Try after some time"
        })
    }

    return res.status(200).json({
        success:true,
        message:"Registration successfull, wait for verification",
        savingUser
    })
}


const loginUser = async(req,res) =>{
    try{
        let {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill both fields properly"
            })
        }

        const checkDetails = await user.findOne({email});

        const checkPass = await checkDetails.matchPassword(password);
        if(!checkPass){
            return res.status(400).json({
                success:false,
                message:"Wrong Password try again later"
            })
        }
        
        if(checkDetails.isVerified === false){
            return res.status(400).json({
                success:false,
                message:"You have not verified yet, try again after some time or register again"
            })
        }
        
        if(checkDetails && checkDetails.blockedByAdmin){
            return res.status(400).json({
                success:false,
                message:"This Account has been blocked, Contact to admin team"
            })
            
        }

        return res.status(200).json({
            success:true,
            userData:checkDetails,
            message:"Login Successfull",
            token:generateToken(checkDetails)
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Login failed, try again later",
            error:error.message
        })
    }
}


module.exports = {registerUser, loginUser}