const express = require('express');
const bodyParser = require("body-parser");
const {dbConnect} = require('../config/configRagister');
const router = require('./Router/ragisterRouter');
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({}) 

// const Test = require('./tests/tickets.test');
// const apiRoutes = require('./Models/tickets.js');

dbConnect();
const app = express();
app.use(bodyParser.json());
// app.use(apiRoutes);
app.use(router);

app.listen(3000,()=>{ 
    console.log("listening on this 3000 port")
})


