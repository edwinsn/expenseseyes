const mongoose = require("mongoose");

const functions = require("firebase-functions");


let url = process.env.DATABASEURI || functions.config().env.databaseuri
/*
if(functions.config().env){
  url=functions.config().env.databaseuri
}
else{
  url = process.env.DATABASEURI
}
*/

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", ()=>{
  console.log("DB connected!");
});
