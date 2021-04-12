const validator = require('validator');
const isEmpty = require('./isEmpty');


function validateRegisterInput(data){
    let errors = {}


    data.name  = !isEmpty(data.name)? data.name: "";
    data.email = !isEmpty(data.email)? data.email : "";
    data.password = !isEmpty(data.password)? data.password: "";



    // name field validate
    if(validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }else if(!validator.isLength(data.name, {min : 2, max : 30 })){
        errors.name = "Name must be between 2 to 30 character";
    }


    // email validation
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }


    // password validation
    if(validator.isEmpty(data.password)){
        errors.password = "password is required"
    }


    return{
        errors,
        isValid : isEmpty(errors)
    }
}

module.exports = validateRegisterInput;