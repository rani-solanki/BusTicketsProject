const mongoose = require('mongoose');
const bus = require('../Models/Bus.js');
const User = require('../Models/user.js');

var TicketSchema = mongoose.Schema({
    "seatsNumber" : {
        type : Number,
        required : true,
        unic : true
    },
    "isBooked":{
        type : Boolean,
        default : false
    },
    "TicketsCost":{
        type : Number,
        required : true,
    },
    
    User : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    bus:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'bus',
        required : true
    },
})

ticket = mongoose.model('tickets', TicketSchema)
module.exports = ticket


