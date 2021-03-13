const TicketSchema = require('../Models/tickets');

registerUser = (seatsNumber,status,date,Time,TicketsCost,res)=>{

    user =  new TicketSchema({
        seatsNumber : seatsNumber,
        status : status,
        date : date,
        Time : Time,
        TicketsCost : TicketsCost
    })

    user.save().then((data)=>{
        res.status(200).send("user Register sucessfully")
    }).catch((err)=>{
        res.status(404).send(err);
    })
}
module.exports = {registerUser};

getUser = (res)=>{
    TicketSchema.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err)
    })
}
module.exports = {registerUser,getUser};





