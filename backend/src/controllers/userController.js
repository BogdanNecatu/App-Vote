const catchAsync = require('./../../utils/catchAsync');
const User = require('./../models/userModel');
// const AppError = require('./../../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //SEND RESPONSE
  res.status(201).json({
    status: 'Success',
    results: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'User with that id is not exist!',
    });
    return next();
  }
  res.status(201).json({
    status: 'Success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  if (!newUser) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message,
    });
    return next();
  }

  res.status(201).json({
    status: 'Success',
    results: newUser.length,
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, //face sa se comprobeze fiecare cerinta
  });

  if (!user) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'User with that id is not exist!',
    });
    return next();
  }

  res.status(201).json({
    status: 'Success',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'User with that id is not exist!',
    });
    return next();
  }

  res.status(201).json({
    status: 'Success',
    runValidators: true,
    message: 'User has been deleted!',
  });
});
