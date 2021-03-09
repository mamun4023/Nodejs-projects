const mongoose = require("mongoose");

// databse connection
// Databse connection
const db_string = "mongodb://127.0.0.1:27017/myDB"
mongoose.connect(db_string, { useUnifiedTopology: true, useNewUrlParser: true}, (err)=> {
    if(!err)
        console.log("DB is connected")
})




// student model 
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String

})

const userModel = mongoose.model("userModel", userSchema);


module.exports = userModel;



