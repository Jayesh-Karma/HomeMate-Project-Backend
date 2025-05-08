const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  profileImgUrl:{
    type:String,
    default:""
  },
  profileImgPublicUrl:{
    type:String
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone:{
    type:String,
    trim:true,
    required:true,
    unique:true,
  }, 
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  city:{
    type:String,
    required:true
  },
  role: {
    type: String,
    enum: ['builder', 'carpenter', 'painter', 'electrician', 'plumber'],  // here i want to add more options like (builder , carpenter, etc)
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  yearsoFExperience: {
    type:Number,
    default:2
  },
  noOfProjects:{
    type:Number,
    default:10
  },
  serviceDetails: {
    type: String
  },
  workProof:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  homemateProjects:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Service'
  }],
  reported:{
    type:Boolean,
    default:false
  },
  blockedByAdmin:{
    type:Boolean,
    default:false,
  },
  status:{
    type:Boolean,
    default:false
  },
  bio:{
    type: String,
    default:""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.pre('save', async function (next) {
  if (!this.profileImgUrl) {
    try {
      // robo hash avatar url -->
      const avatarURL = `https://robohash.org/${this.name}`;
      this.profileImgUrl = avatarURL;
    } catch (error) {
      console.error('Error fetching random avatar:', error);
      next(error);
    }
  }
  
  next();
});


// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
