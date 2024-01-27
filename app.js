// app.js
require('dotenv').config();

const port = process.env.PORT;
const publicPath = process.env.PUBLIC_PATH;
process.env.NODE_ENV = 'production';

const express = require('express');
const app = express();
const path = require('path');

const helmet = require('helmet');


const sourceRouter    = require('./routes/source');
const expensesRouter  = require('./routes/expenses'); // Importa el nuevo router
const addexpendRouter = require('./routes/addexpend'); 

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, publicPath)));

// Middleware de seguridad Helmet
app.use(helmet());

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Asocia el router de source a la ruta '/sources'
app.use('/sources', sourceRouter);

// Asocia el router de expenses a la ruta '/expenses'
app.use('/expenses', expensesRouter);

// Asocia el router de expenses a la ruta '/addexpend'
app.use('/addexpend', addexpendRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});