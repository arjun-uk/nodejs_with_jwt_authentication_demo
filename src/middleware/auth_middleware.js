const jwtHelper = require('../helpers/jwt_helper');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return HELPERS.errorResponse(res, null, "No token provided", 401);

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  const decoded = jwtHelper.verifyToken(token);

  if (!decoded) return HELPERS.errorResponse(res, null, "Invalid or expired token", 401);

  req.user = decoded; // attach user info to request
  next();
};

module.exports = authMiddleware;
