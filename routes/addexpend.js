// routes/expenses.js
const express = require('express');
const router = express.Router();
const addExpendController = require('../controllers/addexpendController');

router.get('/', (req, res) => {
  res.render('addexpend');
});

// Ruta para obtener las categorías
router.get('/categories', addExpendController.getCategories);
router.get('/subcategories', addExpendController.getSubcategories);
router.get('/sources', addExpendController.getAllSources);


module.exports = router