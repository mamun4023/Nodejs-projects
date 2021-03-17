const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended : true}))

app.use((req, res, next)=> {
	res.status(200).json({
		message : "it works"
	})
})






app.listen(3000, ()=> {
    console.log("server is running....")
})