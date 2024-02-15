const cacheKeys = require("../constants/cache-keys");
const Budget = require("../models/budget.model");
const asyncHandler = require("../utils/asyncHandler.utils");

exports.getBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.find().cache({ key: cacheKeys.BUDGETS });
  res.status(200).json(budget);
});

exports.getBudgetByMonth = asyncHandler(async (req, res) => {
  const { month } = req.params;
  const budget = await Budget.find({ month: month }).cache({ key: cacheKeys.BUDGETSBYMONTH });
  res.status(200).json(budget);
});

exports.updateOrCreateBudget = asyncHandler(async (req, res) => {
  const { month, monthlyBudget, newItem } = req.body;

  const existingBudget = await Budget.findOne({ month });

  if (existingBudget) {
    if (monthlyBudget) existingBudget.monthlyBudget = monthlyBudget;

    const categoryIndex = existingBudget.budgets.findIndex(item => item.category === newItem.category);
    if (categoryIndex !== -1) {
      existingBudget.budgets[categoryIndex].amount += newItem.amount;
    } else {
      existingBudget.budgets.push(newItem);
    }

    await existingBudget.save();
  } else {
    const budget = new Budget({
      month,
      monthlyBudget: monthlyBudget,
      budgets: [newItem],
    });
    await budget.save();
  }

  res.status(200).json({ message: "Updated Successfully!" });
});
