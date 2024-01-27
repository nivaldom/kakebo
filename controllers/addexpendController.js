const db = require('../config/database');

const addExpendController = {};

addExpendController.getCategories = (req, res) => {
    const sqlGetCategories = 'SELECT * FROM category';
    
    db.query(sqlGetCategories, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
};

addExpendController.getSubcategories = (req, res) => {
    const { id_category } = req.query;
  
    if (!id_category) {
      return res.status(400).json({ error: 'Missing id_category parameter' });
    }
  
    const sqlGetSubcategories = 'SELECT * FROM subcategory WHERE id_category = ?';
    
    db.query(sqlGetSubcategories, [id_category], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  };

  addExpendController.getAllSources = (req, res) => {
    const sqlGetAllSources = 'SELECT * FROM source';
  
    db.query(sqlGetAllSources, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  }; 
  
module.exports = addExpendController;