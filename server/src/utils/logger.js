const morgan = require('morgan');
const colors = require('colors');

// Define custom token for morgan to colorize status codes
morgan.token('coloredMethod', (req, res) => {
  const method = req.method;
  return colors.bold.cyan(method);
});

morgan.token('coloredUrl', (req, res) => {
  const url = req.originalUrl || req.url;
  return colors.bold.blue(url);
});

morgan.token('coloredStatus', (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) {
    color = 'red';
  } else if (status >= 400) {
    color = 'yellow';
  } else if (status >= 300) {
    color = 'cyan';
  } else if (status >= 200) {
    color = 'green';
  } else {
    color = 'white';
  }
  return colors.bold[color](status.toString());
});

morgan.token('coloredResponseTime', (req, res, tokens) => {
  const responseTime = tokens['response-time'](req, res);
  return colors.bold.magenta(responseTime);
});

morgan.token('coloredContentLength', (req, res) => {
  const contentLength = res.getHeader('content-length');
  return contentLength ? colors.bold.green(contentLength) : '-';
});

// Define custom log format with colorized elements
// Define custom log format with colorized elements
const logFormat = ':coloredMethod :coloredUrl :coloredStatus :response-time ms - :coloredContentLength\n';

/**
 * Middleware function to log HTTP requests with colored elements.
 * @returns {Function} The middleware function.
 */
module.exports = function() {
  // Use morgan middleware with the custom log format
  return morgan(logFormat);
};
