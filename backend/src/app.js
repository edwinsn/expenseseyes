const express = require('express')
const cors = require('cors')

let app = express()

app.set("port",4000)
app.use(cors())
app.use(express.json())
app.use("/", require('./routes'))

module.exports = app