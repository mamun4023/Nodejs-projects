const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// model included
const userModel = require('../../models/users');



// registration route

router.post('/register', (req, res)=> {
    userModel.findOne({email : req.body.email})
        .then(user=> {
            if(user)
                return res.status(400).json({email : "Email already exists"})
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
            jwt.sign(payload,
                     "secret key", 
                     {expiresIn : 3600},
                     (err, token)=> {
                         res.json({
                             success : true,
                             token : "Bearer" + token
                         })
                     }
                     );
                                     
        })

})







module.exports = router;