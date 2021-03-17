const express = require('express');
const bodyParser = require("body-parser");
const {dbConnect} = require('../config/configRagister');
const routers = ('./Router/Bus')
const router = require('./Router/ragisterRouter');
// const validator = require('express-joi-validation').createValidator({}) 
const Joi = require('joi'); 
const Bus = require('./Models/Bus');
const middleware = require('./express-middleware');

dbConnect();
const app = express();
app.use(bodyParser.json());
// app.use(apiRoutes);
app.use(router);
app.use( Joi);
app.use(routers);
app.use(Bus);
app.use(middleware);

app.listen(3000,()=>{ 
    console.log("listening on this 3000 port")
})


