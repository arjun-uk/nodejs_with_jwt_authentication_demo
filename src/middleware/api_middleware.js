
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method.toUpperCase())) {
      res.setHeader('Allow', allowedMethods.join(', '));
      return HELPERS.errorResponse(res, null, "Method Not Allowed", 405);
    }
    // const apiKey = req.headers['token'];
    // const expectedApiKey = process.env.API_KEY;

    // if (!expectedApiKey) {
    //   return HELPERS.errorResponse(res, null, "Server configuration error", 500);
    // }

    // if (!apiKey || apiKey !== expectedApiKey) {
    //   return HELPERS.errorResponse(res, null, "Unauthorized: Invalid API Key", 401);
    // }
    next();

  } catch (error) {
    HELPERS.errorResponse(res, error.message, "Middleware Error", 500);
  }
};
