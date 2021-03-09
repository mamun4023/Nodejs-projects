// model included
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// user registration controller
const registration =  async(req, res)=> {
    const {name, email, password} = req.body;
    let user = await userModel.findOne({email});
	if(user)
		return res.send("Email is already exist" + ` <a href = "/register" > try again </a> `)

    const hashedPws = await bcrypt.hash(password, 12);

    const data = new userModel({
        name,
        email,
        password : hashedPws
    });
  
     data.save()
    .then(()=> {
        res.send("Registration has been completed " + `<a href ="/login" > login </a>`)
    })
    .catch(( )=> {
        res.send("Failed to register" + `<a href ="/register" > try again </a>` )
    })
}


// login controller
const isAuth = (req, res, next)=> {
	if(req.session.isAuth){
		next();
	}else{
		res.redirect('/login')
	}
}


const login  = async(req, res)=> {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    
    if(!user)
        return res.send("Email is not correct" + `<a href ="/login" > try again </a>` );

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch)
        return res.send("Password not matched" +`<a href ="/login" > try again </a>` )
    
    req.session.isAuth = true
    res.redirect('/dashboard');
}


// logout controller
const logout = (req, res)=> {
    req.session.destroy((err)=> {
        res.redirect("/login")
    })
}



module.exports = {
    registration, login,isAuth, logout,
}