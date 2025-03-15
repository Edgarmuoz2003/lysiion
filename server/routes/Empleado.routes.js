const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/Empleado.controller');


router.post('/create', empleadoCtrl.create);


module.exports = router; // Export the router object