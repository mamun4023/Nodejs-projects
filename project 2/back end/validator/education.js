// const validator = require('validator');
// const isEmpty  = require('./isEmpty');


// function validateExperienceinput(data){
//     data.school = !isEmpty(data.school)? data.school: "";
//     data.degree = !isEmpty(data.degree)? data.degree:  "";
//     data.fiedOfstudy = !isEmpty(data.fiedOfstudy)? data.fieddofstudy: "";
//     data.form = !isEmpty(data.form)?data.form: "";



//     if(validator.isEmpty(data.school)){
//         errors.school = "School field is required";
//     }

//     if(validator.isEmpty(data.degree)){
//         errors.degree = "Degree field is required"
//     }

//     if(validator.isEmpty(data.fiedOfstudy)){
//         errors.fiedOfstudy = "field of study field is required"
//     }

//     if(validator.isEmpty(data.form)){
//         errors.form = "From date field is required"
//     }


//     return{
//         errors,
//         isValid : isValid(errors)
//     }
// }

// module.exports = validateExperienceinput()