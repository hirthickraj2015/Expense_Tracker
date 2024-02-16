const { connectDB, disconnectDB } = require('../utils/db');
const Budget = require('../models/budget.model');
const Expense = require('../models/expense.model');
const {mockBudgets, mockExpenses} = require('./data');

const seedDatabase = async () => {
    try {
        await connectDB();

        await Budget.deleteMany({});
        await Expense.deleteMany({});


        await Budget.insertMany(mockBudgets);
        await Expense.insertMany(mockExpenses);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await disconnectDB();
    }
};

seedDatabase();
