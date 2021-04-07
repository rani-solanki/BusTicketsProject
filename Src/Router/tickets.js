const router = require('express').Router();
const Tickets = require('Models/tickets');
const { check, validationResult } = require('express-validator');
const config = require('../config/configRagister.js')
const Bus = require('../Models/Bus');
const user = require('/middleware/auth');

router.post('/ticket',auth,[
    check('seatsNumber','please enter a seatnumber').not().isEmpty(),
    check('isBooked','isbooked status is requried').not().isEmpty(),
    check('TicketsCost','bus number is requried').not().isEmpty(),
    check('bus',"bus is required").not().isEmpty(),
],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors})
    }
    const{ seatsNumber, isBooked,TicketsCost,bus }=req.body;
    
    tickets = { }
    tickets.user = req.user.id
    tickets.bus = req.user.id
    if(seatsNumber)tickets.seatsNumber = seatsNumber;
    if(isBooked)tickets.isBooked=isBooked;
    if(TicketsCost)tickets.TicketsCost = TicketsCost;
    
    await tickets.save();
    console.log(tickets)

})
module.exports = router;
