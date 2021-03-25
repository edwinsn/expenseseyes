const mongoose = require('mongoose')

const url = process.env.DATABASEURI

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology :true,
    useFindAndModify:false
})

const connection = mongoose.connection

connection.once("open",()=>{console.log("DB connected!")})