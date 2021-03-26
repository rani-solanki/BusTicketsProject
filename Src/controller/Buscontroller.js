const BusSchema  = require('../Models/passenger');

registerBus = (seatNumber,BusNumber,BusName,arribleTime,arribleDate,departureTime,departureDate,res)=>{
    bus =  new BusSchema({
            seatNumber : seatNumber,
            BusNumber : BusNumber,
            BusName : BusName,
            arribleTime : arribleTime,
            arribleDate : arribleDate,
            departureTime : departureTime,
            departureDate : departureDate
    })

    bus.save().then((data)=>{
        res.status(200).send("Bus Register sucessfully")
    }).catch((err)=>{
        res.status(404).send(err);
    })
}

getBus = (res)=>{
    BusSchema.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err)
    })
}

module.exports = {registerBus,getBus};

