const router = require('express').Router();
const authController = require('../controller/auth-controller');

const validate = require("../middleware/validationMiddleware");
const { registerValidator, loginValidator } = require("../validators/user-validator");


router.post('/login',loginValidator,validate,authController.loginUser);
router.post('/register',loginValidator,validate,authController.register);

module.exports = router;