const express = require('express');
const bodyParser = require("body-parser");
const {dbConnect} = require('./config/configRagister');
const app = express();

dbConnect();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const router = require('./Router/user.js')
app.use(router)

const authAPI = require("./Router/authapi.js")
app.use(authAPI)

const bus = require('./Router/bus')
app.use(bus)

const ticket = require("./Router/tickets")
app.use(ticket)

const bookTickets = require("./Router/bookTicket.js")
app.use(bookTickets)

app.listen(3000,()=>{  
    console.log("listening on this 3000 port")
})











