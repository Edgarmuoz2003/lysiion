const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/Productos.controller');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})

router.post('/createProducts', upload.array('images'), productoCtrl.create);
router.get('/getOneProduct/:id', productoCtrl.getProduct);
router.get('/searchProducts', productoCtrl.getAllProduct);
router.delete('/deleteOneProduct/:id', productoCtrl.deleteOneProduct);

module.exports = router;