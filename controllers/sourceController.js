// controllers/sourceController.js
const db = require('../config/database');

const sourceController = {};

// Método para obtener y mostrar todos los registros de la tabla source y la suma total
sourceController.getAllSourcesWithTotal = (req, res) => {
  const sqlGetAll = `
  SELECT
  so.id_source,so.name,so.type,so.bank,so.currency,so.amount AS original_amount,IFNULL(SUM(ex.amount),0) AS expended_amount,(so.amount-IFNULL(SUM(ex.amount),0)) AS amount  
  FROM
  source so
  LEFT JOIN
  expenses ex ON so.id_source = ex.id_source
  GROUP BY so.id_source;
`;
  const sqlGetTotalAmount = 'SELECT SUM(amount)-(SELECT SUM(amount) FROM expenses) AS totalAmount FROM source';

  const sqlGetDailyAmount = `
  SELECT
    (SUM(so.amount) - IFNULL((SELECT SUM(ex.amount) FROM expenses ex), 0)) / DATEDIFF('2024-02-25', CAST(CURDATE() AS DATE)) AS dailyAmount
  FROM
    source so;
`;
  
  db.query(sqlGetAll, (err, result) => {
    
    if (err) {
      return res.status(500).send(err.message);
    }

    // Obtener la suma total de la columna amount
    db.query(sqlGetTotalAmount, (totalAmountErr, totalAmountResult) => {
      if (totalAmountErr) {
        return res.status(500).send(totalAmountErr.message);
      }

      const totalAmount = totalAmountResult[0].totalAmount || 0;

      // Obtener el presupuesto diario
      db.query(sqlGetDailyAmount, (dailyAmountErr, dailyAmountResult) => {
        if (dailyAmountErr) {
          return res.status(500).send(dailyAmountErr.message);
        }

        const dailyAmount = dailyAmountResult[0].dailyAmount || 0;

        // Renderizar la vista con los resultados
        res.render('sources', { sources: result, totalAmount, dailyAmount });
      });
    });
  });
};


module.exports = sourceController;