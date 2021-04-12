const auth = require('../middleware/auth.js')
const router = require('express').Router();
const Ticket = require('../Models/tickets.js')
const Bus= require('../Models/Bus.js')
const User= require('../Models/user.js')

const {check,validationResult}=require("express-validator");
const { route } = require('./bus.js');

// book the tickets
router.put('/Ticket/:busId',auth,[
    check('seatNo','please enter seatNo').not().isEmpty(),
    check('isBooked','please enter isBooked').not().isEmpty(),

    ],async(req,res)=>{
        try{
            const errors =validationResult(req);
            
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors});
            }

            const user = await User.findById(req.user.id)
            const userId = user._id

            const busId = req.params.busId
            const bus = await Bus.findById(busId)
            const {seatNo,isBooked}=req.body;

            if (!bus){
                return res.status(404).send.json({message:errors})
            }

            const seat = await Ticket.findOne({seatNo})
            
            if (!seat){
                res.send({message :"this seat is not available in the this bus"})
            }else{
                const ticketInfo = await Ticket.findOne({isBooked : true})
                console.log(ticketInfo)

            if (ticketInfo){
                res.send("seats is already booked please select the other seat")

            }else{
                const UpdateData = {
                    seatNo,
                    isBooked,
                    userId
                }
                if(user){ 
                    
                    const data = await Ticket.updateOne({seatNo},{$set:UpdateData})
                    console.log(data)

                    const ticketBook = await Ticket.findById({userId}).populate('user',['name','email']).findOne({busId}.populate('busId'))
                    res.send("ticketBook",ticketBook)

                }else{
                    res.send("user is not in dbs please enter the valid token")
                }
            }
        }
    }
    catch(err){
        console.error("message", err)
        res.status(404).send.json({ err})
    }
})

router.get('/close/:busId', async(req, res) => {
    try{       
       const  busId  = req.params.busId
       const bus = await Bus.findById(busId)
       if(!bus){
           return res.status(404).json({msg:"Bus not exist"})   
       }
       else{
            const Tickets = await Ticket.find({isBooked:true})
            return res.status(200).json({msg:"List of all closed tickets",Tickets})
       }      
    }
    catch(err){
       console.log(err)
       res.status(404).json('server error')       
    }
})

router.get('/open/:busId', async(req, res) => {
    try{       
       const  busId  = req.params.busId
       const bus = await Bus.findById(busId)
       if(!bus){
           return res.status(404).json({msg:"Bus not exist"})   
       }
       else{
            const tickets = await Ticket.find({isBooked:false})
            return res.status(200).json({msg:"List of all closed tickets",tickets})
       }      
    }
    catch(err){
       console.log(err)
       res.status(404).json('server error')       
    }
})


module.exports = router;
