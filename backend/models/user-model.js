const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
        //select: false,  // it means when  we get data from database it will not show the password
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

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await Bcrypt.compare(password, this.password);
}

// hash password
userSchema.statics.hashPassword = async function (password) {
    const salt = await Bcrypt.genSalt(10);

    return await Bcrypt.hash(password, salt)
}




// define the model or the collection name
const User = new Mongoose.model("User", userSchema);

module.exports = User;