var router = require('express').Router();
const { registerUser,getUser } = require('../controller/registercontroller');

// create get api
router.get('/users',async(request,response)=>{
    getUser(response)
})

// create post api
router.post('/register',(req,res)=>{
        seatsNumber = req.body.seatsNumber;
        status = req.body.status;
        date = req.body.date;
        Time = req.body.Time;
        TicketsCost = req.body.TicketsCost;
        console.log(req.body)

        registerUser(seatsNumber,status,date,Time,TicketsCost,res);
})
module.exports = router;










