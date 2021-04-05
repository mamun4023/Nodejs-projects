const validator = require('validator');
const { errors } = require('./education');
const isEmpty = require('./isEmpty');


function validateLoginInput(data){
    let errros = {};

    data.email = !isEmpty(data.email)? data.email: "";
    data.password = !isEmpty(data.password)? data.password: "";


    if(!validator.isEmail(data.email)){
        errros.email = "Email is invalid";
    }

    if(!validator.isEmpty(data.email)){
        errors.email = "Email is required"
    }

    if(validator.isEmpty(data.password)){
        errors.password = "password field is required"
    }


    return{
        errors,
        isValid : isEmpty(errors)
    }
}


module.exports = validateLoginInput;