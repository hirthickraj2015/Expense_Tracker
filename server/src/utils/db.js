const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require('colors')
dotenv.config();

const DB_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB database: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  } 
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB database");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
