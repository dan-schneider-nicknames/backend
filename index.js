const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        immutable: false,
        validate: {
            validator: function(nickname) {
                return nickname.includes('Dan')&&nickname.includes('Schneider');
            },
            message: 'Nickname must contain "Dan" and "Schneider"'
        }
    },

});
