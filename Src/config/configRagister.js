const mongoose = require('mongoose');

const url = { "mogoUrI" : "mongodb://localhost:27017/APIdatabse"}
const jwtSecret = "mysecrettoken"

const dbConnect = async ()=>{
    mongoose.connect(url.mogoUrI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true

    }).then(()=>{
        console.log("connection is sucessfully with mongo-db")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = {dbConnect,jwtSecret};








