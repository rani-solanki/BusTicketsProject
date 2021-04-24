const Joi = require('@hapi/joi')

function validateObj(obj, schema) {
    let result = null
    Joi.validate(obj, schema, (err, data) => {
        if (err) {
            result = [false, err]
        }
        else {
            result = [true, data]
        }
    })
    return result
}

function ticketValidation(ticket) {
    const ticketSchema = Joi.object().keys({
    seatNo: Joi.number().max(40).optional(),
    isBooked: Joi.boolean().default(false),
    passenger : Joi.object().keys({
        name:Joi.string().optional().required(true),
        gender:Joi.string().required(true),
        Address: Joi.string().required(true),
        phoneNumber:Joi.number().min(10),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    }),
    userId:Joi.string().optional(),
    busId:Joi.string().required(true),
    })
    
    return validateObj(ticket,ticketSchema)
}
module.exports = {
    ticketValidation: ticketValidation,
}

