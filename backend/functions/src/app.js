const express = require("express");
const cors = require("cors")

const app = express();

app.set("port", 4000);
app.use(cors({ origin: true }));

app.use(express.json());

app.use("/", require("./routes"));



module.exports = app