const mongoose = require('mongoose');
const Bus = require('../Models/Bus.js');
const passenger = require('../Models/passenger.js');

var TicketSchema = mongoose.Schema({
    "seatsNumber" :  {type : Number,  required : true, unic : true},
    "status": {type : String,  required : true,},
    "date" :  { type: Date, default: Date.now() },
    "Time" :  { type : String, required : true },
    "TicketsCost" :   { type : Number, required : true },

    passenger: {type: mongoose.Schema.Types.ObjectId, ref: 'passenger' },
    busInformation : {type : mongoose.Schema.Types.ObjectId, ref: 'Bus' },
});

module.exports = mongoose.model('tickets', TicketSchema)









