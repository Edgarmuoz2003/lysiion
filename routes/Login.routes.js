const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/Login.controller');

router.post('/login', loginCtrl.login);


module.exports = router; // Export the router object
