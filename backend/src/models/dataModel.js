const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  //Schema deficicion
  title: {
    type: String,
    trim: true,
    required: [false, 'Please give a titile to the data'],
    unique: true,
  },

  description: {
    type: String,
    required: [true, 'Please insert the Curent Data!'],
  },
  createdAt: {
    type: Date,
    default: function () {
      return Date.now();
    },
  },
  timer: {
    type: Date,
    expires: '5s',
  },
  voturi: [
    // {
    //   id: {
    //     type: String,
    //     default: '',
    //   },
    //   raspunsDa: {
    //     type: Number,
    //     default: 0,
    //   },
    //   raspunsAbtin: {
    //     type: Number,
    //     default: 0,
    //   },
    //   raspunsNu: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
  ],
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
