const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const pinSchema = new mongoose.Schema({
    pin:{
        type:Number,
    },
    latitude:{
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    },
    locationType:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
},{timestamps:true})
// Register the model

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;

// Export the model for use in other parts of your application