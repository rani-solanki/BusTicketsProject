const router = require('express').Router()
const Bus = require('../model/Bus.js')

//post the data of bus
router.post('/bus', async(req,res)=>{
    const Businfo = new Bus(req.body)
    const newBus = await Businfo.save()
    console.log(newBus)
    if(newBus){
        return res.send({'Seat':'1'});
    }else{router.put('')
        return res.send({"err":"throw err"})
    }
})

//get the data of bus
const bus_id = 0
router.get('/bus', async(req, res)=>{
        await Bus.find((err,data)=>{
        }).then((data)=>{
            res.status(200).json(data)
            console.log(data [_id])
            bus_id = data[_id]

        }).catch((err)=>{
            res.status(404).json(err)
        })
})

// confirm the book the bus
router.put('bus/:busId',async(req,res)=>{
    const { bus_id } = req.params
    const bus = req.bodybusId
    if (bus.is_booked == true) {
        Bus.findById( bus_id , function (err, bus){
            if (err) res.status(404).json({ 'message': 'err' })
        })         
    }else{
        res.status(404).json({'status':'bus is not booked'})
    }
})
module.exports = router
