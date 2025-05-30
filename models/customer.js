const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    current_service:{
        type:String,
    },
    hired_service_providers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    currently_hired:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    uploadedAt: {
        type: Date,
        default: Date.now
      }
})


customerSchema.pre("save", async function(next){

    if (!this.isModified('password')) {
        next();
      }    

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



customerSchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
}

const Customer =  mongoose.model("Customer", customerSchema);
module.exports = Customer;