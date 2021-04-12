
const validator = require('validator');
const isEmpty = require('./isEmpty');



function validateRegisterInput(data){
    let errors = {};


    data.name = !isEmpty(data.name)? data.name: "";
    data.email = !isEmpty(data.email)? data.email : "";
    data.password = !isEmpty(data.password)? data.password:"";
    data.password2 = !isEmpty(data.password2)? data.password2: "";



   // name field validate
    if(validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }
    else if(!validator.isLength(data.name, {min : 2, max : 30})){
        errors.name = "Name must be between 2 and 30 character";
    }
  
    // email validation
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }else if(!validator.isEmail(data.email)){
        errors.email = "Invalid email"
    }
    
    
    // password validate
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }else if(!validator.isLength(data.password, {min : 8, max : 30})){
        errors.password = "password must be between 8 and 30 character";
    }
    
    // confirm passwrod validate
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password is required";
    }else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Password must match"
    }

  
 

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;
