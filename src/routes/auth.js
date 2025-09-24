const router = require('express').Router();
const authController = require('../controller/auth-controller');


router.post('/login',authController.loginUser);
router.post('/register',authController.register);

module.exports = router;