const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config({ path: '.env' });


exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return (
        res
          .status(401)
          .json({ success: false, message: 'Authentication failed. User not found.' })
      );
    }
    return (
      user
        .comparePassword(req.body.password, (err2, isMatch) => {
          if (isMatch && !err2) {
            const { _id, email, name } = user;
            const userInfo = Object.assign({}, { _id, email, name });
            const token = jwt.sign(userInfo, process.env.SECRET, {
              expiresIn: '1day',
            });
            res
              .status(200)
              .json({
                success: true,
                token: `Bearer ${token}`,
              });
          } else {
            res
              .status(401)
              .json({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        })
    );
  });
};

exports.checkAuthorization = (req, res, next) => {
  passport
    .authenticate('jwt', { session: false }, (err, user, info) => {
      console.log(err, 'err', user, 'user', info, 'info');
    })(req, res, next);
};

exports.login = (req, res) => {
  const { _id, email, name } = req.user;
  const userInfo = Object.assign({}, { _id, email, name });
  const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1h' });
  res.send({ ...userInfo, token });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.json({ message: 'not authenticated' });
};
