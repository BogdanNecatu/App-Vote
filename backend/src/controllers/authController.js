const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('../../utils/appError');

const signToken = (id, name, role) => {
  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (newUser) {
    return res.status(404).json({
      message: 'Invalid inputs',
    });
  }

  const token = signToken(newUser._id, newUser.name, newUser.role);

  res.status(200).json({
    status: 'Succes',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email and password exist
  if (!email || !password) {
    return res.status(401).json({
      message: 'Please provide an email and password!!!',
    });
  }

  //2)Check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      message: 'Incorrect email or password!!!!',
    });
  }

  //3)If everything ok, send token to client
  const token = signToken(user._id, user.name, user.role);

  res.status(200).json({
    status: 'succes',
    token,
  });
});

//Middewere function that provide the access
exports.protect = catchAsync(async (req, res, next) => {
  //1. Getting token and checking is exist
  let authToken;
  let decoded;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    authToken = req.headers.authorization.split(' ')[1];
  }
  // console.log(authToken);

  if (authToken === 'undefined' || authToken === 'null') {
    res.status(401).json({
      status: 'Fail',
      runValidators: true,
      message: 'Unauthorized!!! You are not logged in, please log in to get access.',
    });
  }

  //2. Verification the token
  try {
    decoded = await promisify(jwt.verify)(authToken, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: 'Fail',
        runValidators: true,
        message: 'Unauthorized!!! Invalid token',
      });
    }
  }
  // console.log(decoded.id);

  // //3. Check is user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: 'Fail',
      runValidators: true,
      message: 'The User belonging to this token does no longer exist!',
    });
  }

  next();
});
