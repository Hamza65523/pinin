const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    socialToken:{
        type:String,
    },
    verifyUser:{
        type:Boolean,
        default:false
    },
    LoginType:{
        type:String,
        required:true,
        enum: ['Email', 'Google', 'Apple'],
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
    },
},{timestamps:true})
// Register the model

const User = mongoose.model('User', userSchema);

module.exports = User;

// Export the model for use in other parts of your application