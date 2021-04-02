const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/users');
const mongoose = require('mongoose');

const keys = require('../config/keys');


const opts = {};
 
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrkey = keys.secretOrkey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
        userModel.findById(jwt_payload.id)
            .then(user=> {
                if(user){
                return done(null, user);
                }
                return done(null, false);
            })
            .catch(err=> {
                console.log(err);
            })
            
    }))
 };