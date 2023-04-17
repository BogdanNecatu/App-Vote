const catchAsync = require('./../../utils/catchAsync');
const Data = require('./../models/dataModel');

//data sort by
exports.getAllData = catchAsync(async (req, res, next) => {
  const dataSort = await Data.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  if (!dataSort) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'Data not exist!',
    });
    return next();
  }
  res.status(201).json({
    status: 'Success',
    results: dataSort.length,
    data: dataSort,
  });
});

exports.getData = catchAsync(async (req, res, next) => {
  const data = await Data.findById(req.params.id);

  if (!data) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'Data with that id is not exist!',
    });
    return next();
  }
  res.status(201).json({
    status: 'Success',
    data: {
      data,
    },
  });
});

exports.createData = catchAsync(async (req, res, next) => {
  const newData = await Data.create(req.body);
  //primesc token si verific dc es cu cel actual
  res.status(201).json({
    status: 'Success',
    results: newData.length,
    data: {
      data: newData,
    },
  });
});

exports.updateData = catchAsync(async (req, res, next) => {
  const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, //face sa se comprobeze fiecare cerinta
  });

  if (!data) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'Data with that id is not exist!',
    });
    return next();
  }

  res.status(201).json({
    status: 'Success',
    data,
  });
});

exports.deleteData = catchAsync(async (req, res, next) => {
  const data = await Data.findByIdAndDelete(req.params.id);

  if (!data) {
    res.status(404).json({
      status: 'Fail',
      runValidators: true,
      message: 'Data with that id is not exist!',
    });
    return next();
  }

  res.status(201).json({
    status: 'Success',
    runValidators: true,
    message: 'Data has been deleted!',
  });
});
