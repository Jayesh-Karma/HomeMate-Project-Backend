const  mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    serviceProviderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    typeOfService:{
        type: String,
        enum: ['builder', 'carpenter', 'painter', 'electrician', 'plumber'],
        required: true,
    },
    workDescription:{
        type: String,
    },
    location:{
        type: String,
        required: true,
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports =  mongoose.model("Service", workSchema);