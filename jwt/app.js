
const express = require('express');
const app = express();
const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



app.use(bodyParser.urlencoded({extended : true}));



// database  connection

const db_string = "mongodb://127.0.0.1:27017/myDB";

mongoose.connect(db_string, {useNewUrlParser : true, useUnifiedTopology: true}, (err)=> {
    if(!err)
        console.log("DB connected")
})







// define model

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const userModel = mongoose.model('userModel', userSchema);



app.get('/', (req, res)=> {
    res.send("hello")
})



// register route
app.post('/register', (req, res)=> {
    const {name, email, password} = req.body;

    if(!name || !email || !password) return res.send("fill all the fields")
    
    userModel.findOne({email}, (err, result)=> {
        if(result) return res.send("email is already exist") 
        else{
            const data = new userModel({
                name,
                email,
                password
            });
        
            data.save()
                .then(user=> {
                    res.send("saved")
                })
                .catch(()=> {
                    res.send("Failed to saved")
                })

        }
    })   
})







// login route
app.post('/login', (req, res)=> {
   const {email, password} =  req.body;

   userModel.findOne({email})
    .then(user=> {
        if(!user) return res.send("Incorrect email")
        if(password != user.password) return res.send("incorrect password")

        const token = jwt.sign({_id : req._id}, "secret");
        res.header('auth-token', token).send(token)

    })
})

function Auth(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.send("access denied")

    try{
        const verified = jwt.verify(token, 'secret');
        req.user = verified;
        next();
    } catch(err){
        res.send("Invalid Token")
    }
}


// authorized route
// in header on postman set token 
// auth-token    place token
app.get('/protected',Auth, (req, res)=> {
        res.send("protected route has been appeared ")
})


// logout 


app.listen(3000, ()=> {
    console.log("server is running...")
})


