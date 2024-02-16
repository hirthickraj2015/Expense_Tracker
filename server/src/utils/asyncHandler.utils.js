/**
 * Async error handling middleware for Express.js.
 * @param {Function} fn - Asynchronous function to be executed.
 * @returns {Function} - Middleware function.
 */
const asyncHandler = (fn) => (req, res, next) => {
    try {
        // Execute the asynchronous function and return its promise
        // If the promise resolves successfully, move to the next middleware
        return fn(req, res, next).catch(next);
    } catch (err) {
        // If there's a synchronous error (outside of the asynchronous function),
        // log the error and pass it to the error handler middleware
        console.error(err);
        next(err);
    }
};

module.exports = asyncHandler;
