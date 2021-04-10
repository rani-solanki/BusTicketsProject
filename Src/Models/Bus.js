const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

var BusSchema = new mongoose.Schema({
    "BusNumber" :{
        type : String,
        unique : true,
        required:true
    },
    "BusName" : {
        type : String,
        unique:true,
        required:true
    },
    "nomOfseats" : {
        type : Number,
        unique : true,
        required : true
    },
    "startCity" :{
        type : String,
        required : true
    },

    "endCity" :{
        type : String,
        required : true
    },

    "arribleTime" :{
        type : Date,
        default:Date.now,
        required:true
    },
    "arribleDate" : {
        type : Date,
        default:Date.now,
        required:true
    },
    // "departureTime":{
    //     type : Date,
    //     default:Date.now,
    //     required:true
    // },    
    "departureDate" :{
        type : Date,
        default : Date.now,
        required:true
    },
})

Bus = mongoose.model('bus', BusSchema)
module.exports = Bus

