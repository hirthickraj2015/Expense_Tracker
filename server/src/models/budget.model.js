const mongoose = require("mongoose");
const budgetSchema = new mongoose.Schema({
  month: String,
  monthlyBudget: Number,
  budgets: [
    {
      amount: Number,
      category: String,
    },
  ],
});

const budget = mongoose.model("budget", budgetSchema);
module.exports = budget;
