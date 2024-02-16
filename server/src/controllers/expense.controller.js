const Expense = require("../models/expense.model");
const asyncHandler = require("../utils/asyncHandler.utils");
const cacheKeys = require('../constants/cache-keys')

exports.getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.find().cache({ key: cacheKeys.EXPENSES });
  res.status(200).json(expense);
});

exports.getExpenseByMonth = asyncHandler(async (req, res) => {
  const { month } = req.params;
  const expense = await Expense.find({ month: month }).cache({ key: cacheKeys.EXPENSESBYMONTH });
  res.status(200).json(expense);
});

exports.deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Expense.findOneAndDelete({ uuid: id });
  res.status(200).json({ message: "Deleted Successfully!" });
});

exports.postExpense = asyncHandler(async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.status(201).json({ data: newExpense });
});


