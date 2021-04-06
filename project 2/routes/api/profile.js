const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// load profile model
const profileModel = require('../../models/profile');
const postModel = require('../../models/posts');


//  laod validation 
const validateProfileInput = require("../../validator/profile");
const validateExperienceinput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");
const userModel = require('../../models/users');
const { populate } = require('../../models/users');



// current user profile

router.get('/', (req, res)=> {
    const errors = {};
    profileModel.findOne({user : req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err));
})



// get all profile


router.get("/all", (req, res)=> {
    const  errors = {};
    profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles=> {
            if(!profiles){
                errors.noprofile = "There is no profiles";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile : "There is no profiles"}))
});


// get profile by handle


router.get('/handle/:handle', (req, res)=> {
    const errors = {};
    profileModel.findOne({handle : req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});



// get profile by user id

router.get('/user/:user_id', (req, res)=> {
    const errors = {};

    profileModel.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({profile : "There is no profile for this user"}))
})



// create or edit user profile

router.post('/', (req, res)=> {
    const {errors, isValid} = validateProfileInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // skills split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profileModel.findOne({user : req.user.id}).then(profile => {
        if(profile){
            profile.findOneAndUpdate(
                {user : req.user.id},
                {$set : profileFields},
                {new : true}
            ).then(profile => res.json(profile));
        }else{
            // create 
            // check if handle exists
            profileModel.findOne({handle : profileFields.handle}).then(profile => {
                if(profile){
                    errors.handle = "That handle already exists";
                    res.status(400).json(errors);
                }

                // save profile
                new profile(profileFields).save().then(profile => res.send(profile));
            })
        }
    })
})


// add experiece profile

router.post('/experience', (req, res)=> {
    const {errors, isValid} = validateExperienceinput(req.body);

    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    profileModel.findOne({user : req.user.id}).then(profile => {
        const newExp = {
            title : req.body.title,
            company : req.body.company,
            location : req.body.location,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        };
        // add to exp array
        profileModel.experience.unshift(newExp);
        profileModel.save().then(profile => res.json(profile))
    })
})


// add education to profile
router.post('/education', (req, res)=> {
    const {errors, isValid} = validateExperienceinput(req.body);

    // check validation
    if(!isValid){
        return rs.status(400).json(errors)
    }
})








module.exports = router;