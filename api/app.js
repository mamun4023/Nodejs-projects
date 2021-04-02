const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);


app.use(bodyParser.urlencoded({extended : true}));
const db_string = "mongodb://127.0.0.1:27017/myDB";
mongoose.connect(db_string, {useUnifiedTopology: true, useNewUrlParser: true }, (err)=> {
	if(!err)
		console.log("connected")
})



app.use(session({
	secret : "secret key",
	resave : false,
	// not show the session ID
	saveUninitialized : false,
	store : store
}));






// make model
const userSchema =  mongoose.Schema({
	name : String,
	email : String
})

const userModel = mongoose.model("userModel", userSchema);

// insert 
app.post('/post', (req, res)=> {
	const {name, email} =  req.body;
	const data = new userModel({
		name,
		email
	})

	data.save()
	.then(()=> {
		res.json({message : "success to insert data"})
	})
	.catch(()=> {
		res.json({message : "Failed to insert data"})
	})
})


// // retrieve all data
// app.get('/fetch', (req, res)=> {
//     const data = req.body.name 
// 	userModel.findById(data)
// 	 .then((data)=> {
// 		 res.send(data)
// 		 console.log(data)
// 	 })
// 	 .catch((err)=> {
// 		 res.send("err happend")
// 	 })
// })



app.get("/fetch/:id", (req, res)=> {
	userModel.findById({_id : req.params.id},(err, data)=> {
		if(err)
			res.send("Failed to find data")
		else{
			res.send(data)
		}
	})
})



// delete route
app.delete('/delete/:id', (req, res)=> {
	userModel.findOneAndDelete({_id : req.params.id }, (err)=> {
		if(err)
			res.send("Failed to delete")
		else
			res.send("success to delete")

	})
})


// update route
app.put("/update/:id", (req, res)=> {
	userModel.findOneAndUpdate({_id : req.params.id}, {name: "Ahad", email : "ahad@gmail.com"}, (err)=> {
		if(err)
			res.send("failed to update")
		else
			res.send("data updated")
	})
})



app.listen(3000, ()=> {
	console.log("server is start");
})