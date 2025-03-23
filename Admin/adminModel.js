const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },   
    phone:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        default:"admin" 
    }
})

adminSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

adminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = new mongoose.model('Admin', adminSchema);