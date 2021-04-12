const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');




app.use(cors());

// define body parser

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
// db configuration


const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser : true, useUnifiedTopology : true }, (err)=> {
    if(!err)
        console.log("DB connected")
})







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

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log("server is running on port..." +port)
})