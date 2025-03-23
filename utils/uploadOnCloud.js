const cloudinary = require('./cloudConnection');
const path = require('path');

// Function to upload an image
const uploadImage = async (filePath, folder) => {
  try {
    
    const fileName = filePath.name;
    console.log(fileName)
    const ext = path.extname(fileName).toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    
    if (!validExtensions.includes(ext)) {
      throw new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
    }


    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: `${folder}`, 
      transformation:[
        { width:500, height:500, crop:"fill"},
        {quality:"auto"},
        {fetch_format:"auto"}
      ]
    });

    return result;
  } catch (error) {
    console.log(error);
    // console.error('Error uploading image:');
    throw error;
  }
};

module.exports = uploadImage 