const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.post('/register', loginController.register);
router.post('/', loginController.login);

module.exports = router