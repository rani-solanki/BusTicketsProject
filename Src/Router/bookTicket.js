const auth = require('../middleware/auth.js')
const router = require('express').Router();
const Ticket = require('../Models/tickets.js')
const Bus= require('../Models/Bus.js')
const User = require('../Models/user.js')
const {body}=require("express-validator");
const { func } = require('joi');

// book the tickets
router.put('/Ticket/:busId',auth,[
    body('seatNo').not().isEmpty().withMessage('enter the seatNo'),
    body('isBooked').not().isEmpty().withMessage('enter the status')
],async(req,res)=>{
        try{
            const data = req.body
            const newUser = data
            const busId = req.params.busId
            const bus = await Bus.findById(busId)
        
            // confirim the bus is available or not 
            if (!bus){ return res.status(404).send().json({message:"bus Not Found" })}

            // find duplicate seats
            const seats = []
            const bookedSeats = []
            const dataLength = newUser.passenger.length
            for( var i=0;i< dataLength; i++) {

                if (seats.includes(newUser.passenger[i].seatNo)){
                    dulicateSeat = newUser.passenger[i].seatNo
                    return res.status(400).json({"Nounique seat":dulicateSeat})
                }else{
                    seats.push(newUser.passenger[i].seatNo)
                    // find seats are already book

                    const ticket = await Ticket.findOne({busId,seatNo:newUser.passenger[i].seatNo,isBooked:true})
                    if(ticket){ bookedSeats.push(newUser.passenger[i].seatNo) }
                }
            }
            if(bookedSeats!=0){
                return res.status(400).json({
                    "These seats are not available choose another seats":bookedSeats})
                }

            // check wheather seats are not present in bus
            const invalidSeats = []
            for(i=0;i< seats.length;i++) {
                const seat =await Ticket.findOne({busId,seatNo:seats[i]})
                if(seat.length===0) {invalidSeats.push(seats[i]) }
            }

            if (invalidSeats.length!==0){
                return res.status(401).json({"seats Not Found":invalidSeats})
            }

            const userInfor = await User.findById(req.user.id)
            const userId = userInfor._id

            if(userInfor){
                const tickets=[]
                for(k=0;k<seats.length;k++){
                    const newData = newUser.passenger[k]

                    // book the tickets for passenger 
                    if(newData.name){
                        const passengers = []
                        const user = {}
                        user.name = newUser.passenger[k].name;
                        user.gender = newUser.passenger[k].gender;
                        user.phoneNumber = newUser.passenger[k].phoneNumber;
                        user.Address = newUser.passenger[k].Address
                        user.email=newUser.passenger[k].email;
                        passengers.push(user)

                        const ticketUpdation = {seatNo:seats[k], isBooked:newUser.passenger[k].isBooked,passenger:passengers}
                        Booktickets(ticketUpdation)
                    
                    
                    // book the ticket for user 
                    }else{
                        const passenger=[]
                        const user={}
                        user.name = userInfor.name;
                        user.gender = userInfor.gender;
                        user.phoneNumber = userInfor.phoneNo;
                        user.Address = userInfor.Address;
                        user.email = userInfor.email;
                        passenger.push(user)

                        const ticketUpdations = {seatNo:seats[k],isBooked:newUser.passenger[k].isBooked,userId,passenger}
                        Booktickets(ticketUpdations)
                    }

                    async function Booktickets(ticketUpdations){
                        await Ticket.updateOne({busId,seatNo:seats[k]},{$set:ticketUpdations})
                        const bookedTicket = await Ticket.findOne({busId,seatNo:seats[k]})
                        .populate('busId',[])
                        tickets.push(bookedTicket)
                        
                    }
                }
                return res.status(200).json({msg:"Bookedticket",tickets})
        }
        else {
            res.send("please enter the user valid token")
        }    
    }
    catch(err){
        console.error("message", err)
        res.status(404).send().json({ err})
    }
})


// get the all close tickets
router.get('/close/:busId', async(req, res) => {
    try{
       const  busId  = req.params.busId
       const bus = await Bus.findById(busId)
       if(!bus){
           return res.status(404).json({msg:"Bus not exist"})
       }
       else{
            const Tickets = await Ticket.find({busId,isBooked:true})
            return res.status(200).json({msg:"closeTickets",Tickets})
       }
    }
    catch(err){
       res.status(404).json('server error')
    }
})

// get the all open tickets
router.get('/open/:busId', async(req, res) => {
    try{
       const  busId  = req.params.busId
       const bus = await Bus.findById(busId)
       if(!bus){
           return res.status(404).json({msg:"Bus not exist"})
       }
       else{
            const tickets = await Ticket.find({busId,isBooked:false})
            return res.status(200).json({msg:"openTickets",tickets})
       }
    }
    catch(err){
       console.log(err)
       res.status(404).json('server error')
    }
})

// view tickets status
router.get('/ticket/:busId/:ticketId',async(req,res)=>{
    try{
        const BusId = req.params.busId
        const ticketId=req.params.ticketId
        const bus= await Bus.findById(BusId)

        if(!bus){
            return res.status(404).json('Bus not exist')
        }        const ticket =await Ticket.findById(ticketId)
        if(!ticket){
            return res.status(404).json({msg:"ticket Not Found"})
        }
        const isBooked=ticket.isBooked
        return res.status(200).json({msg:isBooked})

    }catch(err){
        console.log("error",err)
        res.status(404).json("err")
    }
})

//View Details of person owning the ticket.
router.get('/detail/:busId/:_id',auth,async(req,res)=>{
    try{
        const busId = req.params.busId
        const  _id  = req.params._id
        const busNo= await Bus.findById(busId)

        if(!busNo){
            return res.status(404).json('Bus Not Found')
        }

        const tickets = await Ticket.find({busId})

        if(tickets.length===0){
            return res.status(404).json({msg:'Enter the valid BusId'})
        }

        const user = await User.findById(req.user.id)
        const userid = user._id

        let userdata= await User.findById(userid)

        if(!userdata){
            return res.status(404).json('usre not exist')
        }
        const ticket = await Ticket.findById(_id)
        const userId = ticket.userI
        
        if(userId.toString() === userid.toString())
        {
            const ticketDetail = await Ticket.find({busId,_id}).populate('busId',[]).populate('userId',[])
            return res.status(200).json({msg:"passenger details",ticketDetail})
        }
        else{
            return res.status(404).json("Enter the valid token")
        }
    }
    catch(err){
        console.log(err)
        res.status(404).send("server error")
    }
})

module.exports = router;

