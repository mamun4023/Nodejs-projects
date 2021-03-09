const express = require("express");
const router = express.Router();
// controller included
const userController = require("../controllers/userController");




// All display page  routes
router.get('/register', (req, res)=> {
    if(req.session.isAuth == true)
       res.redirect("/dashboard")
    res.render("registration", {})
})

router.get('/login', (req, res)=> {
    if(req.session.isAuth == true)
        res.redirect("/dashboard")

    res.render("login", {})
})

router.get('/dashboard', userController.isAuth, (req, res)=> {
    res.render("dashboard", {})
})



router.post("/registration",userController.registration)
router.post('/login', userController.login);
router.post('/logout', userController.logout);






// default route

module.exports = router;