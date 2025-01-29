const Mongoose = require("mongoose");
const JWT = require("jsonwebtoken")

const userGoogleSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    }
});


// Generate token
userSchema.methods.generateAuthToken = function () {

    const payload = {
        email: this.email,
        id: this._id
    }

    const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "300000"  // 5min
    })

    return token;
}



// define the model or the collection name
const User = new Mongoose.model("UserGoogle", userGoogleSchema);

module.exports = User;