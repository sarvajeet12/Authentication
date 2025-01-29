const User = require("../models/user-model");
const Otp = require("../models/otp-model");
const OtpGenerator = require("otp-generator")
const BlackListToken = require("../models/blacklisted-token-model")



// -----------------------------------------  otp logic ------------------------------------------------
const sendOTP = async (req, resp) => {

    try {

        const { email } = req.body;


        // email already exist or not
        const alreadyExists = await User.findOne({ email: email });

        if (alreadyExists) {
            return resp.status(403).json({
                success: false,
                message: "User already registered"
            })
        }

        //generate otp [in otp only numbers present]
        let otp = OtpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });


        // check otp is unique or not
        const checkOtp = await Otp.findOne({ otp: otp });

        // ? We want unique otp, so jab tak  unique otp nahi milta, tab tak loop chalega
        // if not unique
        while (checkOtp) {
            otp = OtpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            checkOtp = await Otp.findOne({ otp: otp })
        }



        const otpPayload = { email, otp };

        //create an entry for otp in db
        const otpBody = await Otp.create(otpPayload);
        // console.log("OTP Payload: ", otpBody);

        // return response 
        return resp.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            response: otpBody
        })

    } catch (error) {
        console.log("Something went wrong while send otp: ", error);
        next(error)
    }


}

// -----------------------------------------  register logic ------------------------------------------------
const userSignUp = async (req, resp) => {

    try {
        // get data from frontend 
        const { email, password, otp } = req.body;


        // if data not present
        if (!email || !password || !otp) {
            return resp.status(400).json({ success: false, message: "Fill the form properly" })
        }

        // check user exist or not
        const alreadyExists = await User.findOne({ email: email });
        // if (userExist return true and false)
        if (alreadyExists) {
            return resp.status(400).json({ success: false, message: "User Already Register" });
        }


        // get recent otp
        const recentOtp = await Otp.findOne({ email: email }).sort({ createdAt: -1 });

        // if otp not found and matched 
        if (recentOtp === null) {
            return resp.status(404).json({
                success: false,
                message: "Invalid otp"  // in otp collection no otp found with this email
            })
        } else if (otp != recentOtp.otp) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Otp"
            })
        }

        // hashing the password
        const hashedPassword = await User.hashPassword(password);

        //Get initial character
        let initial = '';
        if (email.charAt(0) === 'H' || email.charAt(0) === 'h' || email.charAt(0) === 'S' || email.charAt(0) === 's') {
            initial = email.charAt(0).toUpperCase();
        } else {
            initial = email.charAt(0).toLowerCase();
        }

        // create user
        const userCreated = await User.create({
            email, password: hashedPassword, image: `https://api.dicebear.com/5.x/initials/svg?seed=${initial}`,
        })

        // response
        resp.status(200).json({
            success: true,
            message: "SignUp Successfully",
            response: userCreated
        })

    } catch (error) {
        console.log("Error Occurs while singUp: ", error);
        next(error)
    }
}

// -----------------------------------------  login logic ------------------------------------------------
const userLogin = async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(400).json({ success: false, message: "Fill the form properly" });
        }


        // matching  login email and register email
        const user = await User.findOne({ email: email }).select("+password");

        // console.log(user) : if true, show all information of that data
        if (!user) {
            return resp.status(400).json({ success: false, message: "User not registered, please singUp first" });

        }

        // password comparing frontend password and db password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return resp.status(401).json({ success: false, message: "Invalid Credentials" })
        } else {
            const token = user.generateAuthToken();

            // additional info
            const options = {
                maxAge: 5 * 60 * 1000, // 5min
                httpOnly: true,
            }

            resp.cookie("token", token, options)

            resp.status(200).json({
                success: true,
                message: "User Login Successful",
                token: token,
                response: user,

            });
        }

    } catch (error) {
        console.log("Error Occurs while login: ", error);
        next(error);
    }
}


// ---------------------------------------------- get user profile ------------------------------------------------
const getUserDetails = async (req, resp) => {
    try {
        const userDetails = req.user;
        // userDetails => show payload value

        // you want to get user all details
        const user = await User.findById(userDetails.id).select("-password");

        resp.status(200).json({ success: true, response: user });

    } catch (error) {
        console.log("Error Occurs while get user details: ", error);
        next(error)
    }
}


// ------------------------------------------------- logout user ----------------------------------------------
const userLogout = async (req, resp) => {
    try {
        resp.clearCookie('token');

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        await BlackListToken.create({ token });

        resp.status(201).json({ success: true, message: "Logout Successfully" })

    } catch (error) {
        console.log("Error Occurs while logout: ", error);
        next(error)
    }
}


// get all user
const getAllUser = async (req, resp) => {
    try {
        const allUserEmail = await User.find({}, 'email');


        // console.log("user email", allUserEmail.email)
        const emails = allUserEmail.map(user => user.email);

        if (!allUserEmail || allUserEmail.length === 0) {
            return resp.status(404).send({ message: "No data Found" });
        }

        resp.status(200).json({ success: true, response: emails });
    } catch (error) {
        // resp.status(500).json({ message: error });
        // console.log(error);
        next(error)
    }
}


module.exports = { sendOTP, userSignUp, userLogin, getUserDetails, userLogout, getAllUser };
// module.exports = { userLogin, getUserDetails, userLogout, getAllUser };