const router = require('express').Router()
const Bus = require('../Models/Bus');
const auth = require('../middleware/auth.js')
const User = require('../Models/user');
const { build } = require('joi');

const validation=require("../validation/busValidation.js")
const busValidation = validation.busValidation

router.post('/Bus',auth,async(req,res)=>{

    let [result, data] = busValidation(req.body)
    if (!result) return res.status(400).json({data})
    try{ 
        const user=await User.findById(req.user.id)
        let isAdmin = user.isAdmin
        console.log(isAdmin)

        if(isAdmin===true){ 
            const bus =new Bus(req.body)
            const newbus =await bus.save()
            if(newbus)
            {
                const busId=bus.id
                return res.status(200).json({msg:"BusId",busId})
            }  
        }
        else{
            return res.status(400).json({msg:"enter the valid admin token"})
        } 
    }
    
    catch(err) {
        return res.status(401).send({"error":"Bus number has to be unique"})
    }     
})


// view the bus information 
router.get('/Bus/:busId', async(req, res)=>{
    try{
        busId = req.params.busId
        bus = await Bus.findById(busId);
        console.log(bus)

        if (bus){
            res.json(bus)
        }
        else{
            res.status(404).send().json({message: "bus is not exits"})
        }
    }
    catch(err){
        console.error("message",err)
        res.status(404).json(err)
    }
})

module.exports = router;



