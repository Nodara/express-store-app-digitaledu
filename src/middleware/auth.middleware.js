const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  let token = req.headers['authorization'];


  if(!token) throw new Error('unauthorized');

  token = token.split(' ')[1];

  let decodedToken;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
      throw new Error('unauthorized');
    }
    decodedToken = decoded;
  });

  req.user = {
    userId: decodedToken.userId
  };

  next();
}; 

module.exports = { checkAuth };