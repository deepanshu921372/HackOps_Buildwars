// server/controllers/userController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Allow updates to name, email, and phone
  if (req.body.name) user.name = req.body.name;
  
  // Check if email is being updated and is not already in use
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already in use');
    }
    user.email = req.body.email;
  }
  
  // Check if phone is being updated and is not already in use
  if (req.body.phone && req.body.phone !== user.phone) {
    const phoneExists = await User.findOne({ phone: req.body.phone });
    if (phoneExists) {
      res.status(400);
      throw new Error('Phone number already in use');
    }
    user.phone = req.body.phone;
  }
  
  // Update password if provided
  if (req.body.password) {
    user.password = req.body.password;
  }
  
  const updatedUser = await user.save();
  
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    points: updatedUser.points,
    itemsRecycled: updatedUser.itemsRecycled,
  });
});

// @desc    Update user points
// @route   PUT /api/users/:id/points
// @access  Private
exports.updateUserPoints = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Ensure the user can only update their own points or admin is doing it
  if (req.user.id !== req.params.id) {
    res.status(401);
    throw new Error('Not authorized to update other users points');
  }
  
  const { points, itemsRecycled } = req.body;
  
  // Validate points
  if (points !== undefined) {
    if (isNaN(points) || points < 0) {
      res.status(400);
      throw new Error('Points must be a positive number');
    }
    user.points = points;
  }
  
  // Validate itemsRecycled
  if (itemsRecycled !== undefined) {
    if (isNaN(itemsRecycled) || itemsRecycled < 0) {
      res.status(400);
      throw new Error('Items recycled must be a positive number');
    }
    user.itemsRecycled = itemsRecycled;
  }
  
  const updatedUser = await user.save();
  
  res.status(200).json({
    _id: updatedUser._id,
    points: updatedUser.points,
    itemsRecycled: updatedUser.itemsRecycled,
  });
});

// @desc    Add points to user
// @route   PUT /api/users/:id/add-points
// @access  Private
exports.addUserPoints = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const { points, itemsRecycled } = req.body;
  
  // Validate points
  if (!points || isNaN(points) || points <= 0) {
    res.status(400);
    throw new Error('Points must be a positive number');
  }
  
  // Add points to user
  user.points += points;
  
  // Increment items recycled if provided
  if (itemsRecycled && !isNaN(itemsRecycled) && itemsRecycled > 0) {
    user.itemsRecycled += itemsRecycled;
  }
  
  const updatedUser = await user.save();
  
  res.status(200).json({
    _id: updatedUser._id,
    points: updatedUser.points,
    itemsRecycled: updatedUser.itemsRecycled,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  await user.remove();
  
  res.status(200).json({ message: 'User removed' });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Public
exports.getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalItems = await User.aggregate([
    {
      $group: {
        _id: null,
        totalItemsRecycled: { $sum: '$itemsRecycled' }
      }
    }
  ]);
  
  const topUsers = await User.find()
    .sort({ points: -1 })
    .limit(5)
    .select('name points itemsRecycled');
  
  res.status(200).json({
    totalUsers,
    totalItemsRecycled: totalItems.length > 0 ? totalItems[0].totalItemsRecycled : 0,
    topUsers
  });
});