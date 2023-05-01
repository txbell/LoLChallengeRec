const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
	id: {type: Number},
    localizedNames: {type: Object},
    state: {type: String},
    leaderboard: {type: Boolean},
    thresholds: {type: Object},
})

module.exports = mongoose.model('Challenge', ChallengeSchema)