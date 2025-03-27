// server/routes/authRoutes.js
const express = require('express');
const { 
  register, 
  login, 
  getMe
  // forgotPassword,
  // resetPassword,
  // updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current logged-in user
router.get('/me', protect, getMe);

// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:resetToken', resetPassword);
// router.put('/update-password', protect, updatePassword);

module.exports = router;