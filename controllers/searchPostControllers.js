const Post = require("../models/post");
const user = require("../models/user");

const get_All_Cities_Of_ServiceProviders = async(req,res) =>{
    try {
        const location = await user.distinct('city');

        if(!location){
            return res.status(400).json({
                success: false,
                message:"Unable to fetch locations",
              });    
        }

        return res.status(200).json({
          success: true,
          message:"All cities of our service providers",
          locations: location,
        });
      } catch (error) {
        console.error('Error fetching locations:', error);
        return res.status(500).json({
          success: false,
          message: 'Error while fetching locations ---> Server error',
        });
      }
}

// get location where our service providers worked --->
const getAllLocation = async(req,res) =>{
    try {
        const location = await Post.distinct("location");

        if(!location){
            return res.status(400).json({
                success: false,
                message:"Unable to fetch locations",
              });    
        }

        return res.status(200).json({
          success: true,
          message:"All locations of our work",
          locations: location,
        });
      } catch (error) {
        console.error('Error fetching locations:', error);
        return res.status(500).json({
          success: false,
          message: 'Server error while fetching locations',
        });
      }
}

// search posts by location
const searchPostByLocation = async(req,res) =>{
    try {
        const location = req.params.location;


        const searchLocation = await Post.find({location:location});
        if(!searchLocation){
            return res.status(400).json({
                success: false,
                message:"Unable to fetch locations of posts",
              });    
        }

        return res.status(200).json({
          success: true,
          message:"All locations of our work",
          locations: searchLocation ,
        });

    
    } catch (error) {
        
        return res.status(400).json({
            success: false,
            message:"Posts fetching by location failed ---> server error"
          });
  
    }
}

//search post by services
const searchPostsByService = async(req, res) =>{
    try {
        const {service} = req.body;
        const searchPosts = await Post.find({service_type:service});

        if(!searchPosts){
            
        return res.status(404).json({
            success: false,
            message:"Can't find anything related to service",
          });
        }

        
        return res.status(200).json({
            success: true,
            message:"All locations of our work",
            posts:searchPosts
          });
  
    } catch (error) {
        
        return res.status(400).json({
            success: false,
            message:"Can't fetch posts ---> server error",
          });
  
    }
}

// search service_providers according to services ---> 
const search_serviceProviders_By_service = async(req,res) =>{
    try {
        const {service} = req.body;
        const searchAccounts = await user.find({role:service});

        if(!searchAccounts){
            
        return res.status(404).json({
            success: false,
            message:"Can't find anything related to service",
          });
        }

        
        return res.status(200).json({
            success: true,
            message:"All locations of our work",
            posts:searchAccounts
          });
  
    } catch (error) {
        
        return res.status(400).json({
            success: false,
            message:"Can't fetch posts ---> server error",
          });
  
    }
} 

// service provider /broker full detailed account
const account_details = async(req,res) =>{
    try {
        const accountId = req.params.id;
        const accountDetails = await user.findById(accountId).populate("workProof");
        if(!accountDetails){
            
        return res.status(404).json({
            success: false,
            message:"Can't find anything related to service",
          });
        }

        
        return res.status(200).json({
            success: true,
            message:"All Details of service provider",
            posts:accountDetails
          });
  
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            success: false,
            message:"Can't fetch posts ---> server error",
          });
  
    }
}


module.exports = {get_All_Cities_Of_ServiceProviders,
                    getAllLocation,
                    searchPostByLocation, 
                    searchPostsByService, 
                    search_serviceProviders_By_service,
                    account_details,
                }