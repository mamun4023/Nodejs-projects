const mongoose = require('mongoose');


// make schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    },
    
    avatar : {
        type : String,
        required : true
    }
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
 