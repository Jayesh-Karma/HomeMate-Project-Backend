const user = require("../../models/user");
const deleteFromCloud = require("../../utils/deleteFromCloudinary");
const uploadImage = require("../../utils/uploadOnCloud");


const getAllServiceProvider = async(req,res) =>{
    try {
        const users = await user.find();
        // all users contain only the name, img, city and role
        const filteredUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            img: user.profileImgUrl,
            city: user.city,
            role: user.role,
            service: user.serviceDetails,
            verified: user.isVerified
        }));

        if(!filteredUsers){
            return res.status(404).json({
                success: false,
                message:"No users found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            users:filteredUsers
        })
      
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Unable to fetch users --> server error"
        })
    }
}


// get service provider ny there 
const getServiceProvidersByService = async (req, res) =>{
    try {
        const service = req.params.service;
        
        const users = await user.find({role:service}, {password:0});
        if(!users){
            return res.status(404).json({
                success: false,
                message:"No users found for this service"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            users:users
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Unable to fetch users --> server error"
        })
    }
}



const getAllDetails =async(req,res) =>{
    try {
        const id = req.user.id;
        const accountDetail = await user.findById(id).populate("workProof");
        // console.log(accountDetail)
        if(!accountDetail){
            return res.status(400).json({
                success:false,
                message:"Invalid Account"
            })
        }
        const {name, phone, email, role, profileImgUrl,  serviceDetails, workProof} = accountDetail;
        return res.status(200).json({
            success:true,
            message:"Details fetched successfully",
            userDetails: accountDetail
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Invalid Account --> server error"
        })

    }
}


// edit details for user 
const editAllDetails = async(req,res) =>{
    try {
        const id = req.user.id;
        const account = await user.findById(id);
        const profileImg = req?.files?.profileImg;
        // console.log(profileImg)
        const {name, email, phone, role, serviceDetails, bio} = req.body;

        if(profileImg){
            
            if(account.profileImgUrl !== `https://robohash.org/${account.name}`){
                const deleteRes = await deleteFromCloud(account.profileImgPublicUrl);
                if(!deleteRes){
                    return res.status(400).json({
                        success:false,
                        message:"Failed to delete profile image "
                    })
                }
            }
            const responce = await uploadImage(profileImg, "Profile Images");
            if(!responce){
                    return res.status(400).json({
                        success:false,
                        message:"Failed to uploaf profile image"
                    })
            }


            account.profileImgUrl = responce.secure_url;
            account.profileImgPublicUrl = responce.public_id;
        }

        if(name){
            account.name = name;
        }
        if(email){
            account.email = email;
        }
        if(phone){ account.phone = phone; }
        if(role){  account.role = role; }
        if(serviceDetails){  account.serviceDetails = serviceDetails; }
        if(bio){  account.bio = bio; }

        const updatedAccount = await account.save();
        if(!updatedAccount){
            return res.status(400).json({
                success:false,
                message:"Edit failed"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Edit Successfull",
            userDetails: updatedAccount
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Edit failed ---> server error"
        })
    }
}

// mark status of service provider 
const mark_status = async(req, res) =>{
    try {
        const id = req.user.id;
        const account = await user.findById(id);

        if(!account){
            return res.status(400).json({
                success:false,
                message:"Can't mark the status"
            })
        }

        account.status = true;
        await account.save();

        const updatedUser = await user.findById(id).populate("workProof")

        return res.status(200).json({
            success: true,
            message:"status marked as busy",
            userData: updatedUser
          });

          
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Can't mark the status ---> server error"
        })
    }
}


// unmark status of service provider 
const unmark_status = async(req, res) =>{
    try {
        const id = req.user.id;
        const account = await user.findById(id);

        if(!account){
            return res.status(400).json({
                success:false,
                message:"Can't mark the status"
            })
        }

        account.status = false;
        await account.save();

        const updatedUser = await user.findById(id).populate("workProof")

        return res.status(200).json({
            success: true,
            message:"status marked as busy",
            userData: updatedUser
          });

          
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Can't mark the status ---> server error"
        })
    }
}


module.exports = { getAllServiceProvider, getServiceProvidersByService, getAllDetails, editAllDetails, mark_status, unmark_status};