const router = require('express').Router();
const Tickets = require('../Models/tickets');
const { check, validationResult } = require('express-validator');
const config = require('../config/configRagister.js')
const bus = require('../Models/Bus');
const User = require('../Models/user');

router.post('/ticket/:busId' ,[
    // check('seatNo','please enter a seatnumber').not().isEmpty(),
    check('isBooked','isbooked status is requried').not().isEmpty(),    
    check('TicketsCost','bus number is requried').not().isEmpty(),
],async(req,res)=>{
    // Query the right ticket using the BusID
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()) { return  res.status(400).json({errors:errors}) }

        const  busId  = req.params.busId
        let Bus = await bus.findById(busId)

        if (!Bus){
            return res.json({"message":"bus is not exit"})
        }

        let ticketForBus = await Tickets.findOne({busId})

        if (ticketForBus){ 
            return res.json("tickets is already created for this bus")
        }
        else{
            const seats = Bus.nomOfseats;
            const tickets=[]
            const{isBooked,TicketsCost}=req.body;

            for (var seatNo = 1; seatNo <= seats; seatNo++){
                var ticket = { }
                if (Bus); ticket.busId = busId;
                if(seatNo) ticket.seatNo = seatNo;
                if(isBooked) ticket.isBooked = isBooked; 
                if(TicketsCost) ticket.TicketsCost = req.body.TicketsCost;
                tickets.push(ticket)
            }
            const result  = await Tickets.insertMany(tickets)
            res.send(result)
        }
    }
    catch(err){
        console.error(err)
        res.send("server error")
    }
})

module.exports = router
