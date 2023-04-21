const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        displayName: { type: String, required: true },
        puuid: { type: String },
        gameName: { type: String },
        tagLine: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)