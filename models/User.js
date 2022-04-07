const {Schema, model} = require('mongoose');

const User = new Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
});

module.exports = model('users', User);