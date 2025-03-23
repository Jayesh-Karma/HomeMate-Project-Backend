const user = require("../models/user");
const { blockedAccountNotification } = require("../utils/Email Templates/blockedAccount");
const { verificationTempalte } = require("../utils/Email Templates/verificationSuccessfully");
const emailSender = require("../utils/emailSender");


const getPendingServiceProviders = async(req,res) =>{
    try{
        const getServiceProviders = await user.find({ isVerified: false}).select('-password');
        
        console.log(getServiceProviders);
        return res.status(200).json({
            success:true,
            service_providers:getServiceProviders
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "Error in finding all service providers ----> server error",
            error:error.message
        })
    }
}


const verifyServiceProviders = async(req,res) =>{
    
    try {

        const serviceProviderId = req.params.id;
        const serviceProvider = await user.findById(serviceProviderId);
        if(!serviceProvider){
            return res.status(404).json({
                success:false,
                message:"Not a service provider"
            })
        }
        if(serviceProvider.isVerified === true){
            return res.status(200).json({
                success:true,
                message:"Service provider is already verified"
            })
        }
        
        const sendMail = await emailSender( 
            serviceProvider.email,
            "HomeMate: Account Verified Successfully"," ",
            verificationTempalte(serviceProvider.name));
            
            if(!sendMail){
                return res.status(400).json({
                    success:false,
                    message:"Email not sended"
                })
            }
            serviceProvider.isVerified = true;
            await serviceProvider.save();

        res.status(200).json({
            success:true,
            message:"Service provider verified successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message: "Error in verifying service provider ----> server error",
            error:error.message
        })
    }
}

// get all acounts -->
const getAllAccounts = async(req,res) =>{
    try {
        const allUsers = await user.find({});

        if(!allUsers){
            return res.status(400).json({
                success:false,
                message:"Unable in fetching users ",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Succesfully fetched all users from db",
            allUsers: allUsers
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Unable to fetch from database ----> server error",
        })
    }
}

// get all details of a particular account ---> 
const getAllDetailsOfAccount = async(req,res) => {
    try {
        const accountId = req.params.id;
        const account = await user.findById(accountId)
        .populate('workProof');

        if(!account){
            return res.status(400).json({
                success:false,
                message:"Invalid Account"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Account details fetched",
            user:account
        })
    

    } catch (error) {   
        return res.status(400).json({
            success:false,
            message:"Can't fetch Account details ----> server error"
        })
    }
}


// get reported accounts --> 
const getAllReportedAccounts = async(req,res) =>{
    try {
        const allUsers = await user.find({reported:true});

        if(!allUsers){
            return res.status(400).json({
                success:false,
                message:"Unable in fetching reported accounts ",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Succesfully fetched all reported accounts from db",
            allUsers: allUsers
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Unable to fetch reported accounts from database ----> server error",
        })
    }
}

// get blocked accounts --->
     
const getBlockedAccounts = async(req,res) =>{
    try {
        const allUsers = await user.find({blockedByAdmin:true});

        if(!allUsers){
            return res.status(400).json({
                success:false,
                message:"Unable in fetching blocked accounts ",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Succesfully fetched all Blocked accounts from db",
            allUsers: allUsers
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Unable to fetch blocked accounts from database ----> server error",
        })
    }
}

//block any acounts --->
const blockReportedAccount = async(req,res) =>{
    
    try {

        const accountId = req.params.id;
        const account = await user.findById(accountId);
        
        if(account.reported !== true){
            return res.status(400).json({
                success:false,
                message:"This Account is not reported yet"
            })
        }
        
        const sendMail = await emailSender( 
            account.email,
            "HomeMate: Your Account has been Blocked"," ",
            blockedAccountNotification(account.name));
            
            if(!sendMail){
                return res.status(400).json({
                    success:false,
                    message:"Email not sended"
                })
            }
            account.blockedByAdmin = true;
            await account.save();

        res.status(200).json({
            success:true,
            message:"Account has been blocked"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message: "Error in blocking account ----> server error",
            error:error.message
        })
    }
}


// Block forcefully without reported ---->
const blockAnyAccount = async(req,res) =>{
    
    try {

        const accountId = req.params.id;
        const account = await user.findById(accountId);

        
        const sendMail = await emailSender( 
            account.email,
            "HomeMate: Your Account has been Blocked"," ",
            blockedAccountNotification(account.name));
            
            if(!sendMail){
                return res.status(400).json({
                    success:false,
                    message:"Email not sended"
                })
            }
            account.blockedByAdmin = true;
            await account.save();

        res.status(200).json({
            success:true,
            message:"Account has been blocked"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message: "Error in blocking account ----> server error",
            error:error.message
        })
    }
}

// unblock any account 

// Block forcefully without reported ---->
const unblockAnyAccount = async(req,res) =>{
    
    try {

        const accountId = req.params.id;
        const account = await user.findById(accountId);

        
        const sendMail = await emailSender( 
            account.email,
            "HomeMate: Your Account has been Unblocked"," ",
            blockedAccountNotification(account.name));  //--> i have to change the mail template
            
            if(!sendMail){
                return res.status(400).json({
                    success:false,
                    message:"Email not sended"
                })
            }
            account.blockedByAdmin = false;
            await account.save();

        res.status(200).json({
            success:true,
            message:"Account has been Unblocked"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message: "Error in unblocking account ----> server error",
            error:error.message
        })
    }
}




// delete any acoount --->
const deleteServiceProvider = async(req,res) =>{
    try {
        const id  = req.params.id
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Invalid Service Provider Id"
            })
        }

        const searchIdx = await user.findByIdAndDelete(id);
        
        if(!searchIdx){
            return res.status(400).json({
                success:false,
                message:"No record found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Service provider's account deleted successfully",
        }) 

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Unable to delete service provider ----> server error",
        })
    }
}



module.exports = { getPendingServiceProviders,
     verifyServiceProviders,
      getAllAccounts,
       getAllDetailsOfAccount,
        getAllReportedAccounts,
        getBlockedAccounts,
         blockReportedAccount,
          blockAnyAccount,
          unblockAnyAccount,
           deleteServiceProvider};