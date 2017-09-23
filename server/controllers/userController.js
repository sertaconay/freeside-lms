const User = require('../models/User');


exports.register = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res
      .status(400)
      .json({ success: false, message: 'Please enter email, password and name.' });
  } else {
    const newUser = new User({ email: req.body.email, password: req.body.password, name: req.body.name });
    newUser.save((err) => {
      if (err) {
        console.log(err, 'err');
        return (
          res
            .status(400)
            .json({ success: false, message: 'That email address already exists.' })
        );
      }
      return (
        res
          .status(201)
          .json({ success: true, message: 'Successfully created new user.' })
      );
    });
  }
};
