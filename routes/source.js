// routes/source.js
const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');

//Ruta para obtener todas las fuentes 
router.get('/', sourceController.getAllSourcesWithTotal);

module.exports = router;