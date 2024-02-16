const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  uuid:String,
  month: String,
  transaction: {
    title: String,
    amount: Number,
    category: String,
  },
});

const expense = mongoose.model("expense", expenseSchema);
module.exports = expense;
