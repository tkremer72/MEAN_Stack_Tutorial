const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(
  token,
  'this_is_the_secret_key_this_should_be_very_long_this_should_never_be_given_to_anyone_ever_the_developer_is_the_only_person_who_should_ever_know_or_be_in_posession_of_this_secret_key'
  );
    req.userData = { user_email: decodedToken.user_email, userId: decodedToken.userId, is_admin: decodedToken.is_admin}
  next()
}  catch(error) {
  res.status(401).json({
    message: 'You are not authenticated, please log in and try again later!'
  })
}
}
