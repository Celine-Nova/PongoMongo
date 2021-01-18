const mongoose = require('mongoose');
const FriendSchema = new mongoose.Schema({
    login: {
        type: String,
    
    },
    password: {
        type: String,
      
    },
    age: Number,
    family: String,
    race: String,
    food: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]


});

module.exports = mongoose.model('Friends', FriendSchema);
