const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(
  token,
  process.env.JWT_KEY  
  );
    req.userData = { user_email: decodedToken.user_email, userId: decodedToken.userId, is_admin: decodedToken.is_admin}
  next()
}  catch(error) {
  res.status(401).json({
    message: 'You are not authenticated, please log in and try again later!'
  })
}
}
