const express = require('express');
const searchRouter = express.Router();


searchRouter.get("/search", (req, res)=> {
    res.render("search", {})
})








module.exports = searchRouter;