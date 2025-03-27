// server/controllers/recyclingController.js
const RecyclingCenter = require('../models/RecyclingCenter');
const asyncHandler = require('express-async-handler');

// @desc    Get recycling centers near a location
// @route   GET /api/recycling/centers
// @access  Public
exports.getNearbyRecyclingCenters = asyncHandler(async (req, res) => {
  const { longitude, latitude, maxDistance = 10000, category } = req.query;
  
  if (!longitude || !latitude) {
    res.status(400);
    throw new Error('Please provide longitude and latitude');
  }
  
  let query = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: parseInt(maxDistance) // Distance in meters
      }
    }
  };
  
  // If category is provided, filter by accepted items
  if (category) {
    query.acceptedItems = category;
  }
  
  const centers = await RecyclingCenter.find(query);
  
  res.status(200).json(centers);
});

// @desc    Get recycling center by ID
// @route   GET /api/recycling/centers/:id
// @access  Public
exports.getRecyclingCenterById = asyncHandler(async (req, res) => {
  const center = await RecyclingCenter.findById(req.params.id);
  
  if (!center) {
    res.status(404);
    throw new Error('Recycling center not found');
  }
  
  res.status(200).json(center);
});

// @desc    Add a new recycling center
// @route   POST /api/recycling/centers
// @access  Private/Admin (would require admin middleware in a real app)
exports.addRecyclingCenter = asyncHandler(async (req, res) => {
  const { 
    name, 
    address, 
    location, 
    contact, 
    operatingHours, 
    acceptedItems, 
    description, 
    imageUrl 
  } = req.body;
  
  // Validate required fields
  if (!name || !address || !location || !acceptedItems) {
    res.status(400);
    throw new Error('Please provide all required fields: name, address, location, and acceptedItems');
  }
  
  // Validate location format
  if (!location.coordinates || location.coordinates.length !== 2) {
    res.status(400);
    throw new Error('Location must include valid coordinates [longitude, latitude]');
  }
  
  // Create center
  const center = await RecyclingCenter.create({
    name,
    address,
    location,
    contact,
    operatingHours,
    acceptedItems,
    description,
    imageUrl
  });
  
  res.status(201).json(center);
});

// @desc    Update a recycling center
// @route   PUT /api/recycling/centers/:id
// @access  Private/Admin
exports.updateRecyclingCenter = asyncHandler(async (req, res) => {
  let center = await RecyclingCenter.findById(req.params.id);
  
  if (!center) {
    res.status(404);
    throw new Error('Recycling center not found');
  }
  
  // Update center
  center = await RecyclingCenter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json(center);
});

// @desc    Delete a recycling center
// @route   DELETE /api/recycling/centers/:id
// @access  Private/Admin
exports.deleteRecyclingCenter = asyncHandler(async (req, res) => {
  const center = await RecyclingCenter.findById(req.params.id);
  
  if (!center) {
    res.status(404);
    throw new Error('Recycling center not found');
  }
  
  await center.remove();
  
  res.status(200).json({ success: true });
});

// @desc    Get recycling centers by category
// @route   GET /api/recycling/categories/:category
// @access  Public
exports.getRecyclingCentersByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  if (!category) {
    res.status(400);
    throw new Error('Please provide a category');
  }
  
  const centers = await RecyclingCenter.find({ acceptedItems: category });
  
  res.status(200).json(centers);
});