const { number } = require('@hapi/joi')
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

function userValidation(user) {
    const userSchema = Joi.object().keys({
   
    firstName : Joi.string().required(true),
    lastName:Joi.string().optional(),
    gender:Joi.string().required(true),
    Address: Joi.string().required(true),
    phoneNumber:Joi.number().min(10),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().required(true),

    })
    return validateObj(user,userSchema)
}

module.exports = {
    userValidation: userValidation,
}
