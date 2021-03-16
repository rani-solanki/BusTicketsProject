const mongoose = require("mongoose");

var BusSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    "BusNumber" :{type : String, required:true},
    "BusName" : {type : String, required:true},
    "arribleTime" :{type : Date, default:Date.now,required:true},
    "arribleDate" : {type : Date, default:Date.now,required:true},
    "departureTime":{type : Date, default:Date.now,required:true},
    "departureDate" :{type : Date,default : Date.now,required:true}

})

module.exports = mongoose.model('Bus', BusSchema);

