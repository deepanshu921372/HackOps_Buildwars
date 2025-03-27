// server/controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if user already exists with that email or phone
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error('Email already in use');
  }

  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    res.status(400);
    throw new Error('Phone number already in use');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      points: user.points,
      token: user.getSignedJwtToken(),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  // Check if email or phone is provided
  if ((!email && !phone) || !password) {
    res.status(400);
    throw new Error('Please provide email/phone and password');
  }

  // Find user by email or phone
  let user;
  if (email) {
    user = await User.findOne({ email }).select('+password');
  } else {
    user = await User.findOne({ phone }).select('+password');
  }

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Return token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    points: user.points,
    token: user.getSignedJwtToken(),
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    points: user.points,
    itemsRecycled: user.itemsRecycled,
  });
});