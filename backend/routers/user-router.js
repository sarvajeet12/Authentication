const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user-controller")
const authMiddleware = require("../middlewares/auth-middleware");

// Validation path
const userLoginValidation = require("../validation/login-validation");

// middleware
const validate = require("../middlewares/validate-middleware");
// validate(userSchemaValidation),validate(userLoginSchemaVal),


// user login [which user is log (admin or not)]
router
    .route("/send-otp")
    .post(validate(userLoginValidation), userControllers.sendOTP)

// user login [which user is log (admin or not)]
// router
//     .route("/resend-otp")
//     .post(userControllers.sendOTP)

// register page  
router
    .route("/register").
    post(userControllers.userSignUp);

// login page  
router
    .route("/login").
    post(validate(userLoginValidation), userControllers.userLogin);

// user login [which user is log (admin or not)]
router
    .route("/user-details")
    .get(authMiddleware, userControllers.getUserDetails);

// update and forgot password
// router
//     .route("/forgot-password")
//     .put(userControllers.forgotPassword)

// logout
router.route("/user-logout").get(authMiddleware, userControllers.userLogout)


// get all user details
router
    .route("/all-user")
    .get(userControllers.getAllUser);



module.exports = router; 
