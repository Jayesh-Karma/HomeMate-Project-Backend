const cloudinary = require('./cloudConnection');
const path = require('path');

// Function to upload a video
const uploadVideo = async (filePath, folder) => {
  try {
    // const ext = path.extname(filePath.name).toLowerCase();
    
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: folder, 
      resource_type: 'video',  
      transformation: [
        { width: 1080, height: 1080, crop: 'fill' },
        { quality: 'auto' },  
        { fetch_format: 'auto' },  
       
      ]
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

module.exports = uploadVideo;
