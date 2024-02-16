const fs = require('fs');
const path = require('path');
const { category, month } = require('../constants/constant');
const { faker } = require('@faker-js/faker');

const generateRandomExpense = () => {
    return {
        uuid: faker.string.uuid(),
        month: faker.helpers.arrayElement(Object.values(month)),
        transaction: {
            title: faker.hacker.noun(),
            amount: faker.number.int({ min: 1, max: 1000 }),
            category: faker.helpers.arrayElement(Object.values(category)),
        },
    };
};

const generateRandomExpenses = () => {
    const expenses = [];
    for (let i = 0; i < 500; i++) {
        expenses.push(generateRandomExpense());
    }
    return expenses;
};

const generateRandomBudget = () => {
    const allBudgets = [];

    Object.values(month).forEach(mon => {
        const budgets = [];
        let monthlyBudget = 0;
        Object.values(category).forEach(cat => {
            const amount = faker.number.int({ min: 7000, max: 9000 });
            monthlyBudget += amount;
            budgets.push({
                amount: amount,
                category: cat,
            });
        });

        allBudgets.push({
            month: mon,
            monthlyBudget: monthlyBudget,
            budgets,
        });
    });

    return allBudgets;
};

const generateRandomBudgets = () => {
    return generateRandomBudget();
};

const writeToJsonFile = (data, filename) => {
    const directoryPath = path.join(__dirname, 'data');
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data written to ${filePath} successfully!`);
};

const expensesData = generateRandomExpenses();
const budgetsData = generateRandomBudgets();

writeToJsonFile(expensesData, 'expenses.json');
writeToJsonFile(budgetsData, 'budgets.json');
