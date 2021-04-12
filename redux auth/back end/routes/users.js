const express = require("express");
const router = express.Router();


// load controller
const userController = require('../controllers/users');

// registration route
router.post("/users/register", userController.Registration);

// login route
router.post('/users/login', userController.Login);

router.get('/users/data', userController.registeredUser);









module.exports = router;