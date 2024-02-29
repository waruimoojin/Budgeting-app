const mongoose = require('mongoose');


const usersSch = {
    name: {
        type: String,
        required : [true , "Please enter your name"]

    },
    id: {
        type: Number

    }

}

const users = mongoose.model('users', usersSch);

module.exports = users;
