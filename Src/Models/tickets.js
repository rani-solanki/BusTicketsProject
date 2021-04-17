const mongoose = require('mongoose');
const bus = require('../Models/Bus.js');
const User = require('../Models/user.js');
const uniqueValidator = require('mongoose-unique-validator');


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
},
{
    timestamps: true
});

TicketSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});


ticket = mongoose.model('tickets', TicketSchema)
module.exports = ticket


