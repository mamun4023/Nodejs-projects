
const userModel = require('../Models/users');
const validateRegisterInput = require('../validation/register');
const jwt = require('jsonwebtoken');


const Registration = (req, res)=> {
    const {errors, isValid} = validateRegisterInput(req.body);
    
    // check validation
     if(!isValid){
         return res.status(400).json(errors);
     }

    
     const {name, email, password} = req.body;

    // check the existig email
    userModel.findOne({email})
        .then(user => {
            if(user) return res.send("Email already exist")
        })

        const newUser = new userModel({
            name,
            email,
            password,
        })

        newUser.save()
        .then(()=> {
            res.send("Registration successfull")
        })
        .catch(()=> {
            res.send("Failed to register")
        })


}




const Login  = (req, res)=> {
    const {email, password} = req.body;

    userModel.findOne({email})
        .then(user => {
            if(!user) return res.send("invalid email")
            if(user.password != password) return res.send("Invalid password")

            //create token
            const token = jwt.sign({data : "token"}, "secret");
            res.header(token).send(token);

        })
 

}


const registeredUser = (req, res)=> {
    userModel.find()
        .then(user=> {
           res.send(user)
        })
        .catch(()=>{
            res.send("failed to fetch data")
        })
}



module.exports = {
   Registration, Login,registeredUser,
}


