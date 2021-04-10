const mongoose = require('mongoose');
const bus = require('../Models/Bus.js');
const User = require('../Models/user.js');

var TicketSchema = mongoose.Schema({
    "seatNo" : {
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
    
    userId:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        require:true,
    },
    busId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bus',
        require:true,
    }
})

ticket = mongoose.model('tickets', TicketSchema)
module.exports = ticket


