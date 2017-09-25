const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

require('dotenv').config({ path: '.env' });


module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    const jwtUserID = jwtPayload._id // eslint-disable-line
    User.findById(jwtUserID, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  }));
};
