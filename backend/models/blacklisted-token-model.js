
const Mongoose = require('mongoose');

const blacklistTokenSchema = new Mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 min in second
    }
});

module.exports = Mongoose.model('BlacklistToken', blacklistTokenSchema);
