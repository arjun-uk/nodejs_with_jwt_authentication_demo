const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
  signToken: (payload, expiresIn = '1h') => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
};
