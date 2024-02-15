const {clearHash} = require('../utils/cache')

module.exports = (keys) => {
  return async (req, res, next) => {
    await next();
    // console.log("Dropping Cache!")
    keys.forEach(key => clearHash(key));
  }
}