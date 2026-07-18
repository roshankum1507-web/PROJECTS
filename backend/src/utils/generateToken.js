const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production';

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
