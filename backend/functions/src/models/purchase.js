const {Schema, model} = require("mongoose");

const purchaseSchema = new Schema({
  userId: {type: String, require: true},
  name: {type: String, require: true},
  cathegory: {type: String, require: true},
  price: {type: Number, require: true},
  date: {type: Date, require: false},
});

module.exports = model("purchase", purchaseSchema);
