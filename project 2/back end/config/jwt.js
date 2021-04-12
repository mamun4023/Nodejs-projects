const jwt = require('jsonwebtoken');
// auth function

function auth(req, res, next){
    const token = req.header('Authorization');
    if(!token) return res.send("Access defined");

    try{
        const verified = jwt.verify(token,'secret');
        req.user = verified;
        next();

    } catch(err){
        res.send("Invalid Token")
    }
}


module.exports = auth;