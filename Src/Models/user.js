const mongoose = require('mongoose');
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
})

User = mongoose.model('user', UserSchema);
module.exports = User






