const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var UserSchema = mongoose.Schema({
    name: {

        type : String,
        required: true
    },
    gender: {
        type : String,
        required : true
    },
    Address:{
        type : String,
        type : String,
        required : true
    },
    email :{
        type : String,
        unique : true,
        required : true
    },
    passward:{
        type:String,
        unique : true,
        required:true
    },
    isAdmin: {
        type: Boolean,
        required:true,
        default: false
    }
},
{
    timestamps: true
});

UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});

User = mongoose.model('User', UserSchema);
module.exports = User






