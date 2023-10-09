const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
},{timestamps:true})
// Register the model

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

// Export the model for use in other parts of your application