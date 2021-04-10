const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const Bus = require('../Models/Bus');

const validation = [check (
    "BusNumber","bus number is required is required").not().isEmpty(),
    check("BusName","Busname is required").not().isEmpty(),
    check("startCity","startCity is required").not().isEmpty(),
    check("nomOfseats" ,"seatNumber is required").not().isEmpty(),
    check("endCity", "endCity is required").not().isEmpty(),
    check("arribleTime","arribleTime is required ").not().isEmpty(),
    check("arribleDate","please enter the arribleDate").not().isEmpty(),
    // check( "departureTime", "departureTimeis required").not().isEmpty(),
    check("departureDate","please enter the departerDate").not().isEmpty(),
]

router.post('/Bus', validation, async(req,res)=>{
    try{
        const error = validationResult(req)
        if (!error.isEmpty()){
            res.status(400).json({error : error.array()})
        }
        const{BusNumber,BusName,nomOfseats,
            startCity,endCity,arribleTimes,
            arribleDate,departureDate } = req.body;

            bus = new Bus({
                BusNumber,
                BusName,
                nomOfseats,
                startCity,
                endCity,
                arribleTimes,
                arribleDate,
                // departureTime,
                departureDate
            })
            await bus.save();    
            res.send("bus booked")          
    }
    catch(err){
        console.error("err.message")
        res.status(500).send("error")
    }
})
// view the bus information 
router.get('/bus', async(req, res)=>{
    try{
        bus = await Bus.find({ });
        res.json(bus)
    }
    catch(err){
        res.status(404).json(err)
    }
})

module.exports = router;

