const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  //   username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  password: {type: String, required: true},
  createAt: {type: Date, default: Date.now()},
});

userSchema.pre('save', async function() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // todo: if user change his password
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
