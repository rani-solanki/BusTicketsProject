const express = require('express');
const bodyParser = require("body-parser");
const {dbConnect} = require('../config/configRagister');
const routers = ('./Router/Bus')

const router1 = require('./Router/ragisterRouter');
const router2 = require('./Router/Bus');

const middleware = require('express-middleware');
const { registerUser } = require('./controller/registercontroller');

dbConnect();
const app = express();
app.use(bodyParser.json());

app.use(router1);
app.use(router2);

app.listen(3000,()=>{ 
    console.log("listening on this 3000 port")
})





