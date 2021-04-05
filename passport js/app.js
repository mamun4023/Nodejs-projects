const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const Validator = require('validator');



app.use(bodyParser.urlencoded({extended : true}));

const db_string = "mongodb://127.0.0.1:27017/myDB";

mongoose.connect(db_string, { useNewUrlParser : true, useUnifiedTopology : true}, (err)=> {
    if(!err)
        console.log("DB connected")
})


// shcema define
const userSchema = new mongoose.Schema({
    name :{
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    password2: {
        type : String
    }
});


// validation 


// isempty function
const isEmpty = value => {
    return (value === undefined ||
      value === null ||
      (typeof value === "Object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0))
  
  };



// validation function

 function validateRegisterInput(data) {
    let errors = {};

    data.name = isEmpty(data.name) ? "" : data.name;
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;
    data.password2 = isEmpty(data.password2) ? "" : data.password2;

    if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
        errors.name = "Name must be between 5 and 30 characters";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // runs if not in email exists but not in format
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // runs if password exists but not in proper format
    if (
        !Validator.isEmpty(data.password) &&
        !Validator.isLength(data.password, { min: 6, max: 30 })
    ) {
        errors.password = "Password must be at least 6 chracters";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password 2 is required";
    }

    // runs if not in password 2 exists but not in format
    if (
        !Validator.isEmpty(data.password2) &&
        !Validator.equals(data.password, data.password2)
    ) {
        errors.password2 = "Passwords must match";
    }

    return { errors, isValid: isEmpty(errors) };
};




const userModel = mongoose.model('userModel', userSchema);


app.post('/register', (req, res)=> {

    const {errors, isValid} = validateRegisterInput(req.body);
   
    if(!isValid) return res.send(errors);

    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password : req.body.password
    });

    newUser.save((err,user)=> {
        if(err){
            
            res.send(errors)
             
        }else{
            res.send(user);
        }
    })          
})


app.get('/', (req, res)=> {
    res.send("helllo")
})



app.listen(3000, ()=> {
    console.log('server is running...')
})