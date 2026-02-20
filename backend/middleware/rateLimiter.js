const rateLimit = require('express-rate-limit');

const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const authLimiter = createRateLimit(15 * 60 * 1000, 5, 'Too many auth attempts');
const apiLimiter = createRateLimit(15 * 60 * 1000, 100, 'Too many API requests');

module.exports = { authLimiter, apiLimiter };