const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('../models/auth.model');

exports.user_registration = (req, res, next) => {
  bcrypt.hash(req.body.user_password, 12)
    .then(hash => {
      const auth = new Auth({
        user_email: req.body.user_email,
        user_password: hash
      });
      auth.save()
      .then(result => {
        res.status(201).json({
          message: 'User was created successfully!',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
            message: 'You must use a unique email address, this address is already in use!'
        });
      });
    });
}

exports.user_login = (req, res, next) => {
  //Create a variable to store the user from the first then block so that we can move it into the second then block otherwise user does not exist
  let fetchedUser;
  Auth.findOne({ user_email: req.body.user_email })
  .then(user => {
    if(!user) {
      return res.status(404).json({
        message: 'Authentication failed, could not find a user.'
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.user_password, user.user_password)
  }).then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Authentication failed, invalid authentication credentials, please try again later.'
      });
    }
    const token = jwt.sign(
    { user_email: fetchedUser.user_email, userId: fetchedUser._id },
      'this_is_the_secret_key_this_should_be_very_long_this_should_never_be_given_to_anyone_ever_the_developer_is_the_only_person_who_should_ever_know_or_be_in_posession_of_this_secret_key',
     { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'You have been successfully logged in',
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      is_admin: fetchedUser.is_admin
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Authentication failed, please try again later.'
    });
  });
}
