const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuth = require('../../config/jwt');

// model included
const userModel = require('../../models/users');
const passport = require('passport');


//load validator

const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');


// registration route

router.post('/register', (req, res)=> {

    const {errors, isValid} = validateRegisterInput(req.body);

    // cheack validation
    if(!isValid){

        return res.status(400).json(errors)
    }

    userModel.findOne({email : req.body.email})
        .then(user=> {
            if(user)
            {
                errors.email = "Email is already exists";
                return res.status(400).json(errors.email)
            }
            else{

                const avatar =   gravatar.url(req.body.email, {
                    s: '200',  // size 
                    r : 'pg',   // rating
                    d : 'mm' // default
                });

                const newUser = new userModel({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    avatar,
                });
                 

                newUser.save()
                    .then((user)=> {
                        res.status(200).json(user)
                    })
                    .catch(()=> {
                        res.send("failed to saved")
                    })  
            }
        })
});




router.post('/login', (req,res)=> {
    
    const {errors, isValid} = validateLoginInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;
    
    userModel.findOne({email})
        .then(user=> {
            if(!user) return res.status(404).json({msg : " email not found "})
            
            if(user.password != password)
                return res.status(404).json({msg : "Invalid password"})

           // make jwt payload     
           const payload = {id: user.id, name : user.name, email : user.email};
 
           
           // sign jwt token
           const token = jwt.sign({_id: user._id}, "secret")
           res.header('Authorization', token).send(token)
                                          
        })
})




router.get('/data', (req, res)=> {
    userModel.find((err, resutl)=> {
        if(err)
            res.send("err is happned")
        else
           res.send(resutl)
    })
})
 



// auth data
router.get('/protected', isAuth, (req, res)=> {
    res.send("protected route accessed")
})


module.exports = router;