// controllers/expensesController.js
const db = require('../config/database');

const expensesController = {};

// Método para agregar un nuevo gasto
expensesController.addExpense = (req, res) => {
  const { date, concept, category, subcategory, amount, source } = req.body;
  console.log('expensesController.addExpense');
  console.log(req.body);

  const sqlAddExpense = `
    INSERT INTO expenses (date, datehour, concept, id_category, id_subcategory, amount, currency, id_source)
    VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?, ?, 'PEN', ?);
  `;

  db.query(sqlAddExpense, [date, concept, category, subcategory, amount, source], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ success: true, message: 'Expense added successfully' });
  });
};

// Método para listar la tabla expenses
expensesController.listExpenses = (req, res) => {
  const sqlListExpenses = `
  SELECT 
  ex.id_expense,CAST(date AS CHAR) as fec,date,datehour,concept,ex.id_category,id_subcategory,amount,currency,id_source,ca.name,ca.icon 
  FROM expenses ex
  INNER JOIN category ca
  ON ex.id_category = ca.id_category
  ORDER BY ex.date DESC,ex.id_expense DESC
  `;

  db.query(sqlListExpenses, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.render('expenses', { expenses: result });
  });
};

// Método para filtrar gastos por fecha y devolver solo datos
expensesController.filterExpensesData = (req, res) => {
  const { startDate, endDate } = req.query;
  const sqlFilterExpenses = `
  SELECT 
  ex.id_expense,CAST(date AS CHAR) as fec,date,datehour,concept,ex.id_category,id_subcategory,amount,currency,id_source,ca.name,ca.icon 
  FROM expenses ex
  INNER JOIN category ca
  ON ex.id_category = ca.id_category
  WHERE ex.date BETWEEN ? AND ?
  ORDER BY ex.date DESC,ex.id_expense DESC
  `;

  db.query(sqlFilterExpenses, [startDate, endDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};


module.exports = expensesController;