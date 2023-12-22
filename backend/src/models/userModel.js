const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  //Schema deficicion
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    unique: true,
  },
  passwordChangedAt: Date,

  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [4, 'A password must have more or equal then 8 characters'],
  },
  passwordConfirm: {
    //cand creezi o parola trebuie sa confirmi ca parola ta este aceiasi
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //daca pass y confirmpass sunt acelasi
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  connectedLive: {
    type: Boolean,
    default: false,
  },
});

//.pre are loc exact dupa ce datele au fost introduse si pana are loc salvarea lor, pentru asta aici trebuie incriptata pass
userSchema.pre('save', async function (next) {
  // porneste doar daca se modifica parola
  if (!this.isModified('password')) return next();

  //12-este gradul de incriptare, cat mai mare atat mai mult foloseste cpu
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//folosit sa incripteze noua parola introdusa si sa compare cu parola care deja este incriptata
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
