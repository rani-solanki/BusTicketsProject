const Joi = require('joi'); 
const mongoose = require('mongoose');
const { post } = require('../Router/registerBus');

const BusSchema = Joi.object().keys({ 

    seatNUmber : joi.number().min(1).required(true),
    BusNUmber : Joi.string().min(2).max(6).required(),
    BusName: Joi.string().min(3).max(20).required(true),
    arribleTime : joi.default().required(true),
    arribleDate : joi.default().required(true),
    departureTime : joi.default().required(true),
    departureDate : joi.default().min().max().required(true),

  });
  
  module.exports = mongoose.model('Bus', BusSchema);

 