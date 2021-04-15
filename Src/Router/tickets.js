const router = require('express').Router();
const Tickets = require('../Models/tickets');
const { check, validationResult } = require('express-validator');
const config = require('../config/configRagister.js')
const bus = require('../Models/Bus');
const User = require('../Models/user');

router.post('/ticket/:busId' ,[
    check('seatNo','please enter a seatnumber').not().isEmpty(),
    check('isBooked','isbooked status is requried').not().isEmpty(),    
    check('TicketsCost','bus number is requried').not().isEmpty(),
],async(req,res)=>{
    // Query the right ticket using the BusID

    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()) { return  res.status(400).json({errors:errors}) }

        const  busId  = req.params.busId
        let BusInformation = await bus.findById(busId)
        const BusId = await Tickets.findOne({busId})
        
        if (BusId){ 
            return res.json("tickets is already created for this bus")
        }
        else{
            const seats = BusInformation.nomOfseats;
            const tickets=[]
            const{ seatNo, isBooked,TicketsCost}=req.body;

            for (var num = 1; num <= seats; num++){
                var ticket = { }
                if (BusInformation); ticket.busId = busId;
                if(seatNo) ticket.seatNo = num;
                if(isBooked) ticket.isBooked = false; 
                if(TicketsCost) ticket.TicketsCost = req.body.TicketsCost;
                tickets.push(ticket)
            }

            const result  = await Tickets.insertMany(tickets)
            res.send(result)
        }
    }
    catch(err){
        console.log(err)
        res.send("server error")
    }
})

module.exports = router
