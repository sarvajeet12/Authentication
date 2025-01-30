const oauth2Client = require('../configs/google-config');
const GoogleModel = require("../models/google-model");
const UserModel = require("../models/user-model");
const axios = require('axios');


const googleLogin = async (req, resp) => {
    try {
        const { code } = req.query;

        const googleResponse = await oauth2Client.getToken(code);
        // console.log(googleResponse)

        oauth2Client.setCredentials(googleResponse.tokens);

        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { email } = userResponse.data;

        // find exist or not in both model
        const googleUserExists = await GoogleModel.findOne({ email });
        const userModelExists = await UserModel.findOne({ email });

        if (googleUserExists || userModelExists) {
            const token = googleUserExists.generateAuthToken();

            // additional info
            const options = {
                maxAge: 5 * 60 * 1000, // 5min
                httpOnly: true,
            }

            resp.cookie("token", token, options)

            // return response
            resp.status(200).json({
                success: true,
                message: "User Login Successfully",
                token: token,
                response: googleUserExists
                // response: user,

            });
        } else {

            // take initial character
            let initial = '';
            if (email.charAt(0) === 'H' || email.charAt(0) === 'h' || email.charAt(0) === 'S' || email.charAt(0) === 's') {
                initial = email.charAt(0).toUpperCase();
            } else {
                initial = email.charAt(0).toLowerCase();
            }

            // create entry in db
            const user = await GoogleModel.create({
                email, image: `https://api.dicebear.com/5.x/initials/svg?seed=${initial}`,
            })

            // return response
            resp.status(200).json({
                success: true,
                message: "User Registered Successful",
                response: user
            });
        }

    } catch (error) {
        console.log("error in login with google", error);
        resp.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }

}



// get all user 
const getAllUserGoogle = async (req, resp) => {
    try {
        const allUserEmail = await GoogleModel.find({}, 'email');


        // console.log("user email", allUserEmail.email)
        const emails = allUserEmail.map(user => user.email);

        if (!allUserEmail || allUserEmail.length === 0) {
            return resp.status(404).send({ message: "No data Found" });
        }

        resp.status(200).json({ success: true, response: emails });
    } catch (error) {
        // resp.status(500).json({ message: error });
        console.log("error form google login: ", error);
        next(error)
    }
}


module.exports = { googleLogin, getAllUserGoogle }