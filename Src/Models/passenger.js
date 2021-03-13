const mongoose = require('mongoose');
var passengerSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    "userName" : { firstName: {type: String,required: true},

        lastName: String,
        "status" :{type :String,  required : true} },
        "Sex" : {type : String,   required : true},

    "Address":{type : String,   type : String,required : true},
    "phoneNumber" :{type:Number, required : true},
    "emailId" :{type : String,required : true}
})


module.exports = mongoose.model('passenger',passengerSchema)

