const express = require('express');
const app = express();
const expressHandlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);

// initialize body parser 
app.use(bodyParser.urlencoded({extended:false}))


// setup view engine 
app.engine('hbs', expressHandlebars({
    extname : "hbs",
    defaultLayout : "mainLayout",
    layoutsDir : __dirname + "/views"
}))
app.set("view engine", 'hbs');




// make session setup
const db_string = "mongodb://127.0.0.1:27017/myDB"
const Store = new sessionStore({
    uri : db_string,
    collection : "mySession"
})


app.use(session({
    secret : "some secret",
    resave : false,
    saveUninitialized : false,
    store : Store, 
    cookie : {
        expires : 60 * 6000* 6000
    }
}));




// use public folder static and display index.html file
app.use('/', express.static(path.join(__dirname, 'public')))

//import userRoute
const router = require('./routes/userRoute');
app.use(router);


// // include searching router
// const searchRouter = require('./routes/serarchRoute');
// app.use(searchRouter);



// default route
app.get('*', (req, res)=> {
    res.send("page not found")
})




app.listen(3000, ()=> {
    console.log("server is running....")
})