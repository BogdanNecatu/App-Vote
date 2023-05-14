const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const dataRouter = require('./routes/dataRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('../utils/appError');

//settings
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Routes
app.use('/api/data', dataRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can´t find ${req.originalUrl} on this Server!!`, 404));
});

module.exports = app;
