const mongoose = require('mongoose');
const md5 = require('crypto-js/md5');
const validator = require('validator');
const bcrypt = require('bcrypt');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const bluebird = require('bluebird');


const Schema = mongoose.Schema;
mongoose.Promise = bluebird;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  password: {
    type: String,
    required: 'Password is needed',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.virtual('gravatar').get(() => {
  const hash = md5(this.email).toString();
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(mongodbErrorHandler);

userSchema
  .pre('save', function (next) {
    const user = this;
    console.log(user, 'user');
    if (this.isModified('password') || this.isNew) {
      return (
        bcrypt
          .genSalt(10, (err, salt) => {
            if (err) return next(err);
            return (
              bcrypt
                .hash(user.password, salt, (err2, hash) => {
                  if (err2) return next(err2);
                  user.password = hash;
                  return next();
                })
            );
          })
      );
    }
    return next();
  });

userSchema.methods.comparePassword = function (pw, cb) {
  bcrypt
    .compare(pw, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
