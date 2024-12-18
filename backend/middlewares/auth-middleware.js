const JWT = require("jsonwebtoken");
const BlackListToken = require("../models/blacklisted-token-model")

const authMiddleware = async (req, resp, next) => {

    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        console.log("token: ", token)

        if (!token) {
            return resp.status(401).json({ success: false, message: "Unauthorized" })
        }

        const isBlacklisted = await BlackListToken.findOne({ token: token });

        if (isBlacklisted) {
            return resp.status(401).json({ success: false, message: 'Unauthorized' });
        }

        try {

            const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

            req.user = decoded;

            next();

        } catch (error) {
            return resp.status(401).json({ message: 'Unauthorized User' });
        }

    } catch (error) {
        console.log("Error in auth middleware", error)
        next(error)
    }
}




module.exports = authMiddleware;