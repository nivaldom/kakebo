// routes/expenses.js
const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

// Ruta para agregar un nuevo gasto (formulario de envío POST)
router.post('/add', expensesController.addExpense);

// Ruta para renderizar la lista de gastos
router.get('/', expensesController.listExpenses);

// Ruta para filtrar gastos por fecha y devolver solo datos
router.get('/filterData', expensesController.filterExpensesData);

module.exports = router;