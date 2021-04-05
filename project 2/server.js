const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



// define body parser

app.use(bodyParser.urlencoded({extended : true}));
// db configuration
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology : true }, (err)=> {
    if(!err)
        console.log("DB connected")
})


// // passport middleware
app.use(passport.initialize());

// //passport configure
require('./config/passport')(passport);

// import routes
const profile = require('./routes/api/profile');
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

app.use('/api/profile', profile);
app.use('/api/users', users);
app.use('/api/posts', posts);


app.get('/', (req, res)=> {
    res.send("hello ")
})

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log("server is running on port..." +port)
})