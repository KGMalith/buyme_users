let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,

    },
    mobile_number: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    role: {
        type: Number,
        default: 0
        // 0 => normal use , 1=> admin  
    },
    address:{
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);