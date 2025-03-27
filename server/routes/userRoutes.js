// server/routes/userRoutes.js
const express = require('express');
const {
  getUserById,
  updateUserProfile,
  updateUserPoints,
  addUserPoints,
  // Make sure all these functions are properly defined in your userController
  // If any aren't defined, comment them out like you did in authRoutes.js
  // getUsers,
  // deleteUser,
  // getUserStats
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes - if you have any
// If getUserStats is undefined, comment out this line:
// router.get('/stats', getUserStats);

// Protected routes (requires login)
router.put('/profile', protect, updateUserProfile);
router.put('/:id/points', protect, updateUserPoints);
router.put('/:id/add-points', protect, addUserPoints);

// Admin only routes
router.get('/:id', protect, getUserById);
// If getUsers is undefined, comment out this line:
// router.get('/', protect, admin, getUsers);
// If deleteUser is undefined, comment out this line:
// router.delete('/:id', protect, admin, deleteUser);

module.exports = router;