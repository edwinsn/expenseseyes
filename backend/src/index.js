require('dotenv').config()

const app = require('./app')

require('./database')

let main = async()=>{
    await app.listen(app.get("port"))
    console.log("Api listen on: "+app.get("port"))

}

main()