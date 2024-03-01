const mongoose = require('mongoose');


const usersSch = {
    nom: {
        type: String,
        required : [true , "Please enter your name"]

    },
    

}

const users = mongoose.model('users', usersSch);

module.exports = users;
