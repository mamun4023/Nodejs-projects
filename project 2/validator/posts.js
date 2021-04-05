const validator = require('validator');
const isEmpty = require('./isEmpty');



function validatePostInput(data){
    let errors = {};

    data.text = !isEmpty(data.text)? data.text: "";

    if(!validator.isLength(data.text, {min :10, max : 300})){
        errors.text = "Text field is required";
    }

    return({
        errors,
        isValid : isEmpty(errors)
    });
};




module.exports = validatePostInput;