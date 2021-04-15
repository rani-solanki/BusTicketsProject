const router = require('express').Router()
const { check, validationResult } = require('express-validator');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/configRagister.js')

const validation = [check (
    'name',"name is required").not().isEmpty(),
    check("gender","gender is required").not().isEmpty(),
    check("Address","addres is required ").not().isEmpty(),
    check('email','please inclde unique and valid email').isEmail(),
    check('passward','please enter the sward passward').isLength({min:6}),
    check('isAdmin', 'please enter the isAdmin').not()
]

// user or admin signin
router.post('/user', validation, async(req,res)=>{
    const error = validationResult(req)
    if (!error.isEmpty()){
        res.status(400).json({error : error.array()})
    }

    const{ name,gender, Address,email,passward,isAdmin} = req.body;
    try{
        let user = await User.findOne({email});
        console.log(req.body)

        if (user){
            res.status(404).send({ "error":"user already exit"})
        }
        user = new User({
            name,
            gender,
            Address,
            email,
            passward,
            isAdmin
        })

        const salt = await bcrypt.genSalt(10);
        user.passward = await bcrypt.hash(passward,salt)
        await user.save();

        const payload = {
            user:{
                id : user.id
            }
        }
        jwt.sign(payload,
            config.jwtSecret,(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        userInfo = await user.save();  
        console.log(userInfo) 
        
        res.send("user rgisered")
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(error)
    }
})
module.exports = router;


