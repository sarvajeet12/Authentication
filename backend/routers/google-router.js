const express = require("express");
const router = express.Router();

const googleController = require("../controllers/google-controller")



router
    .route("/google-login")
    .get(googleController.googleLogin)





module.exports = router; 
