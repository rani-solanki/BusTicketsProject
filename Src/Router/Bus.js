const router = require('express').Router();
const { response } = require('express');
const { registerBus,getBus} = require('../controller/Buscontroller');

// booking  the bus
router.post('./registeBus',async(req,res)=>{
    try{
        const { body } = req;
        const result = Joi.validate(body, BusSchema); 
        console.log(result)
        const createdBus = await api.createdBus(data); 
        res.sttus(202).json({ 
            message: 'Resource created',
            data: createdBus
        })
        console.log(createdBus)
    }
    catch(error){
        res.status(404).json(error)
        console.log(error)
    }
})

// // get bus Id 
router.get('./registeBus/BusId',(req,res)=>{
    req.json("done")
})

router.get('/user',async(request,response)=>{
    getBus(response)
})

router.post('/registerBus',(req,res)=>{
    seatNumber = req.body.seatNumber;
    BusNumber = req.body.BusNumber;
    BusName = req.body.BusName;
    arribleTime = req.body.arribleTime;
    arribleDate = req.body.arribleDate;
    departureTime = req.body.departureTime;
    departureDate = req.body.departureDate;

    registerBus(seatNumber,BusNumber,BusName,arribleDate,arribleTime,departureTime,departureDate,res);
})

module.exports = router




