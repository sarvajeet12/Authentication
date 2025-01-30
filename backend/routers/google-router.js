const express = require("express");
const router = express.Router();

const googleController = require("../controllers/google-controller")



router
    .route("/google-login")
    .get(googleController.googleLogin)


router
    .route("/all-users-google")
    .get(googleController.getAllUserGoogle)





module.exports = router; 
