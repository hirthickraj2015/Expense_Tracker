const path = require('path');
const fs = require('fs');

const parseJsonFile = (filename) => {
    const filePath = path.join(__dirname, filename);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
};

const mockExpenses = parseJsonFile('expenses.json');
const mockBudgets = parseJsonFile('budgets.json');

module.exports = {
    mockExpenses,
    mockBudgets
};
