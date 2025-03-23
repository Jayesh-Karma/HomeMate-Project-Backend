const path = require("path");
const uploadImage = require("../../utils/uploadOnCloud");
const uploadVideo = require("../../utils/videoUploader");
const deleteFromCloud = require("../../utils/deleteFromCloudinary");
const Post = require("../../models/post");
const user = require("../../models/user");


// get your post details
const getPost = async(req, res) =>{
    try {
        const postId = req.params.id;
        const postData = await Post.findById(postId);

        if(!postData){
            return res.status(400).json({
                success:false,
                message:"cant get the post"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Post data fetched successfully",
            postData:postData
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"cant get the post --> server error"
        })
    }
}

const uploadPost = async(req,res) =>{
    try {
        const id = req.user.id;
        const uploadableFile = req.files.post;
        const { service_type, caption, location, priceFrom, priceUpto} = req.body;

        const ext = path.extname(uploadableFile.name);
        // console.log(caption)

        const postUser = await user.findById(id);
        if(!postUser){
            return res.status(400).json({
                success:false,
                message:"Invalid User"
            })
        }


        let uploadFile;
        if(ext === ".jpeg" || ext === '.jpg' || ext=== '.png'){
             uploadFile = await uploadImage(uploadableFile, "Image Post");
        }
        else if(ext === '.mp4' || ext=== '.mov' || ext === '.avi' || ext === '.mkv'){
            uploadFile = await uploadVideo(uploadableFile, "Video Posts"); 
            console.log(uploadFile)
        }

        if(!uploadFile){
            return res.status(400).json({
                success:false,
                message:"Upload Failed"
            })
        }

        const postCreation = await Post.create({
            serviceProvider:id,
            url: uploadFile.secure_url,
            publicId: uploadFile.public_id,
            caption:caption,
            location:location,
            priceFrom:priceFrom,
            priceUpto:priceUpto,
            service_type:service_type
        })


        if(!postCreation){
            await deleteFromCloud(uploadFile.public_id);
            
            return res.status(400).json({
                success:false,
                message:"Unable to store in db, try again later"
            })
        }

        const userInsertion = await user.findByIdAndUpdate({_id:id},{
            $push:{
                workProof:postCreation._id,
            }
        },{ new: true })
        .populate("workProof");

        // --->i have to add more validations here like what if there will be a problem in insertion

        


        console.log(uploadFile);
        return res.status(200).json({
            success:true,
            message:"Post uploaded successfully",
            postDetails: userInsertion
        })

    } catch (error) {
        console.log(error);
         return res.status(400).json({
            success:false,
            message:"upload failed ---> server error"
        })
    }
}

// edit post controller --- >
const editPost = async(req,res) =>{
    try {
        const postId = req.params.id;
        const {caption, location, priceFrom, priceUpto} = req.body;
        let post; 
        
        if(req.files){
            post = req.files.post;
        }


        const oldPost = await Post.findById(postId);
        let uploadFile;
        if(post){
            const deleteOld = await deleteFromCloud(oldPost.publicId);
            if(!deleteOld){
                return res.status(400).json({
                    success:false,
                    message:"Can't delet from cloud, try again later"
                })
            }
             
            const ext = path.extname(post.name);
        console.log(caption)

        if(ext === ".jpeg" || ext === '.jpg' || ext=== '.png'){
             uploadFile = await uploadImage(post, "Image Post");
        }
        else if(ext === '.mp4' || ext=== '.mov' || ext === '.avi' || ext === '.mkv'){
            uploadFile = await uploadVideo(post, "Video Posts"); 
        }

        if(!uploadFile){
            return res.status(400).json({
                success:false,
                message:"Upload Failed"
            })
        }

        oldPost.url = uploadFile.secure_url;
        oldPost.publicId = uploadFile.public_id;
        }

        if(caption){
            oldPost.caption = caption;
        }
        if(location){
            oldPost.location = location;
        }
        if(priceFrom){
            oldPost.priceFrom = priceFrom;
        }
        if(priceUpto){
            oldPost.priceUpto = priceUpto;
        }
        const saveData = await oldPost.save();

        if(!saveData){
            // i have to add validations here like, what if there was a problem in data saving after updation
            return res.status(400).json({
                success:false,
                message:"Error in editing the file"
            })
        }

        const userData = await user.findById(oldPost.serviceProvider).populate("workProof");

        return res.status(200).json({
            success:false,
            message:"Post updated successfully",
            userData:userData
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"cant edit this post ----> server error"
        })
    }
}


// delete post controller --->
const deletePost = async(req,res) =>{
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        
        const postDetails = await Post.findById(postId);
        if (!postDetails) {
            return res.status(404).json({
              success: false,
              message: "Post not found",
            });
          }

        // i can add more validations here like, if(userId !== postDetails.serviceProvider){ then --> }

        const deleteAsset = await deleteFromCloud(postDetails.publicId);
        if (!deleteAsset) {
            return res.status(404).json({
              success: false,
              message: "Post not deleted from cloud",
            });
          }

          const postDeletion = await Post.findByIdAndDelete(postId);
          if (!postDeletion ) {
              return res.status(404).json({
                success: false,
                message: "Post deletion failed",
              });
          }
        
        const userData = await user.findByIdAndUpdate(userId, {
            $pull:{ workProof:postId}},{new :true}
        ).populate("workProof");

        if (!userData ) {
            return res.status(404).json({
                success: false,
                message: "Post deletion failed",
            });
        }

      return res.status(200).json({
              success: true,
              message: "Post deleted successfully",
              userData: userData
            });
          

    } catch (error) {
        console.log(error)
          return res.status(404).json({
              success: false,
              message: "Post not found --- server error",
            });
          
    }
}



module.exports = { getPost, uploadPost, editPost, deletePost};