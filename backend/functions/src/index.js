const functions = require("firebase-functions");
require("dotenv").config()


const app = require('./app')

require('./database')


app.listen(app.get("port"), ()=>{
    console.log("Server running in "+app.get("port"))
})

exports.app = functions.https.onRequest(app)