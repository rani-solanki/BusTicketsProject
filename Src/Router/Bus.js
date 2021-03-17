const router = require('express').Router()
const BusSchema = require('../model/Bus_schema.js')
const { route } = require('./Model/registerBus.js')
const handler = (req, res, next) 
const middleware = (req, res, next) 

// booking  the bus
route.post('./registeBus',async(req,res,next)=>{
    try{
        const { body } = req;

        const result = Joi.validate(body, BusSchema); 
        const { value, error } = result; 

        const valid = error == null;
        if (!valid) { 
            res.status(422).json({ 
              message: 'Invalid request', 
              data: body 
            }) 
          } else { 
            const createdBus = await api.createdBus(data); 
            res.json({ message: 'Resource created', data: createdBus }) 
        } 
    }
    catch(error){
        res.status(404).json(error)
    }
})

// get bus Id 
route.get('./registerBus/BusId',async(req,res)=>{
    res.json(req.body)
})





