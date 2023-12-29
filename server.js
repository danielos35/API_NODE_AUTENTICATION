const dotenv = require('dotenv');

// Errores asincronos
process.on('uncaughtException', err =>{
  console.log(err);
  // console.log(err.name, err.message);
  process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app');


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running in port ${port}`);
});

// Errores sincronos
process.on('unhandledRejection', (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});