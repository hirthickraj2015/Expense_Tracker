const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const budgetController = require("../controllers/budget.controller");
const cleanCacheMiddleware = require("../middleware/cleanCache.middleware");
const cacheKeys = require("../constants/cache-keys");

router.get("/expense", expenseController.getExpense);
router.get("/expense/:month", expenseController.getExpenseByMonth);
router.post("/expense", cleanCacheMiddleware([cacheKeys.EXPENSES, cacheKeys.EXPENSESBYMONTH]), expenseController.postExpense);
router.delete("/expense/:id", cleanCacheMiddleware([cacheKeys.EXPENSES, cacheKeys.EXPENSESBYMONTH]), expenseController.deleteExpense);

router.get("/budget", budgetController.getBudget);
router.get("/budget/:month", budgetController.getBudgetByMonth);
router.post("/budget", cleanCacheMiddleware([cacheKeys.BUDGETS, cacheKeys.BUDGETSBYMONTH]), budgetController.updateOrCreateBudget);

module.exports = router;
