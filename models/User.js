const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    family: String,
    race: String,
    food: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    }]

});

module.exports = mongoose.model('Users', UserSchema);
