const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// load profile model
const profileModel = require('../../models/profile');

//passport.authenticate('jwt', {session :false}),   auth required
router.get('/',  (req, res)=> {
 
    profileModel.findOne({email : req.body.email})
        .then(profile=> {
            if(!profile) return res.send("There is no profile for user");
            res.send(profile)
        })
})

// router.get('/', (req,res)=> {
//     res.send("profile is comming ")
// })

module.exports = router;