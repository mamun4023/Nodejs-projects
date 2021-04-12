const monoose = require("mongoose");


const userSchema = new monoose.Schema({
    name : "",
    email : "",
    password: "" 

})


const userModel = monoose.model('userModel', userSchema);


module.exports = userModel;



