const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  userId: { type: String, require: true },
  category: { type: String, require: true },
  expected: { type: Number, require: true },
  date: { type: Date, require: true },
});

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

module.exports = model("budget", budgetSchema);
