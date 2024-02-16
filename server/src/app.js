const path = require('path');
const express = require('express');
const cors = require('cors');
const morganLogger = require('./utils/logger');


const api = require('./routes/route');
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(morganLogger());

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(api);

app.use(notFound);
app.use(errorHandler)


module.exports = app;







