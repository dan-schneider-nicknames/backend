const mongoose = require('mongoose');

const nickschema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        immutable: false,
        validate: {
            validator: function(nickname) {
                return nickname.includes('Dan') || nickname.includes('Schneider');
            },
            message: 'Nickname must contain "Dan" or "Schneider"'
        }
    },
});

const nickname = mongoose.model('nickname', nickschema);

nickname.insertMany([
    { nickname: 'Candy Man Dan' },
    { nickname: 'Schneider' },
    { nickname: 'Dan "Ive had tighter" Schneider' },
    { nickname: 'Dan "Rough-rider" Schneider' },
    { nickname: 'Danny Diapers' },
    { nickname: 'Dan "The Starlet Sodomizer" Schneider' },
]);


module.exports = nickname;