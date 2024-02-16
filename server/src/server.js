const http = require('http');
require('dotenv').config();
const app = require('./app');
const colors = require('colors');

const { connectDB } = require("./utils/db");


const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} . Visit http://localhost:${PORT}`.green.bold);
  })
}

startServer();
