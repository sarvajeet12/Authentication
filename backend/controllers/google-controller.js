const oauth2Client  = require('../configs/google-config');
const axios = require('axios');
// const User = require('../models/user-model');

const googleLogin = async (req, resp) => {
    try {
        console.log(req.query)
        const { code } = req.query;

        const googleResponse = await oauth2Client.getToken(code); 
        console.log(googleResponse)

        oauth2Client.setCredentials(googleResponse.tokens);

        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        // const { email, name } = userResponse.data;

        console.log("google login data ; ", userResponse.data);
        resp.status(200).json({ success: true, data: userResponse.data });
        const user = await User.findOne({ email });

        let initial = '';
        if (name.charAt(0) === 'H' || name.charAt(0) === 'h' || name.charAt(0) === 'S' || name.charAt(0) === 's') {
            initial = name.charAt(0).toUpperCase();
        } else {
            initial = name.charAt(0).toLowerCase();
        }

        if (!user) {
            user = await User.create({
                name, email, image: `https://api.dicebear.com/5.x/initials/svg?seed=${initial}`,
            })

        }

        const { _id } = user;
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

    } catch (error) {
        console.log(error);
        resp.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }

}


module.exports = { googleLogin }