const dotenv = require('dotenv');
dotenv.config(); //importa las variables de entorno din .env;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER EXCEPTION! 💣 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection succesful!'));
