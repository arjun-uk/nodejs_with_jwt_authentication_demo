const { validationResult } = require("express-validator");


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return HELPERS.errorResponse(res, null, errors.array().map(err => err.msg).join(", "), 422);
  }
  next();
};

module.exports = validate;
