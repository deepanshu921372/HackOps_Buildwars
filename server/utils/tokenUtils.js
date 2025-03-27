// server/utils/tokenUtils.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate JWT token
 * @param {string} id - User ID to embed in token
 * @returns {string} JWT token
 */
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

/**
 * Generate random reset token
 * @returns {Object} Reset token and hashed version
 */
exports.generateResetToken = () => {
  // Generate random token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and save to database
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expiry for 10 minutes
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return {
    resetToken,
    resetPasswordToken,
    resetPasswordExpire
  };
};

/**
 * Hash a token using SHA-256
 * @param {string} token - Token to hash
 * @returns {string} Hashed token
 */
exports.hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

/**
 * Extract token from request header
 * @param {Object} req - Express request object
 * @returns {string|null} JWT token or null if not found
 */
exports.getTokenFromHeader = (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Or get token from cookie
    token = req.cookies.token;
  }

  return token;
};