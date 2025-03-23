const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  serviceProvider: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  service_type:{
    type:String,
    required:true
  },
  url: {
    type: String,
    required: true
  },
  publicId:{
    type:String
  },
  caption: {
    type: String
  },
  priceFrom:{
    type:String,
  },
  priceUpto:{
    type:String
  },
  location:{
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post
