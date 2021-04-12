
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

// databse connection
const db_string = "mongodb://127.0.0.1:27017/myDB";
mongoose.connect(db_string, {useNewUrlParser : true, useUnifiedTopology: true}, (err)=> {
    if(!err)
        console.log("DB connected")
})


app.use(cors());

//include router
const userRouter = require('./routes/users');
app.use("/api", userRouter);







app.listen(4000, ()=> {
    console.log("server is running....")
})