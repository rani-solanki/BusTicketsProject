const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/express-mongo-app'

const dbConnect = ()=>{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true

    }).then(()=>{
        console.log("connection is sucessfully with mongo-db")
    }).catch(()=>{
        console.log("error")
    })
}
module.exports = {dbConnect};


