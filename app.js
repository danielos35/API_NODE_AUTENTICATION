const express = require('express');
const morgan = require('morgan');


const app = express();

//MIDDLEWARE....................................................

// condicionar mediante variables de entorno
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware personalizado
app.use((req, res, next) => {
  next();
});

// Middleware para manipular la data
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  console.log(req.headers);
  next();
});


app.all('*', (req, res, next) => {
  next(new AppError(`No pudimos encontrar ${req.originalUrl}`, 404));
});

module.exports = app;