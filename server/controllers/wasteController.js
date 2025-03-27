// server/controllers/wasteController.js
const WasteItem = require('../models/WasteItem');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Mock function to analyze waste - in a real application, this would call a ML service
const analyzeWasteImage = async (imageData) => {
  // This is a placeholder for an actual ML image recognition API
  // In a real app, you'd send the image to a service like Google Vision, AWS Rekognition, etc.
  
  // For demo purposes, we'll randomize the result from predefined categories
  const wasteCategories = ['Biodegradable', 'Plastic', 'Glass', 'Metal', 'Paper', 'E-Waste'];
  const category = wasteCategories[Math.floor(Math.random() * wasteCategories.length)];
  
  // Mock items based on category
  const items = {
    'Biodegradable': {
      name: 'Food waste',
      isDIYUsable: true,
      disposalInstructions: 'Dispose in biodegradable waste bin or use for composting',
      diyIdeas: [
        {
          title: 'Home Composting',
          description: 'Turn food waste into nutrient-rich soil for your plants',
          difficultyLevel: 'Easy'
        }
      ]
    },
    'Plastic': {
      name: 'Plastic bottle',
      isDIYUsable: true,
      disposalInstructions: 'Clean and dispose in plastic recycling bin',
      diyIdeas: [
        {
          title: 'Plant Pot',
          description: 'Cut the bottle in half and use the bottom as a small plant pot',
          difficultyLevel: 'Easy'
        },
        {
          title: 'Bird Feeder',
          description: 'Create a simple bird feeder by cutting openings and adding perches',
          difficultyLevel: 'Medium'
        }
      ]
    },
    'Glass': {
      name: 'Glass jar',
      isDIYUsable: true,
      disposalInstructions: 'Clean and dispose in glass recycling bin',
      diyIdeas: [
        {
          title: 'Storage Container',
          description: 'Clean thoroughly and use for storing dry goods or small items',
          difficultyLevel: 'Easy'
        }
      ]
    },
    'Metal': {
      name: 'Aluminum can',
      isDIYUsable: true,
      disposalInstructions: 'Clean and dispose in metal recycling bin',
      diyIdeas: [
        {
          title: 'Pen Holder',
          description: 'Clean, remove sharp edges, and decorate for a desk organizer',
          difficultyLevel: 'Easy'
        }
      ]
    },
    'Paper': {
      name: 'Cardboard box',
      isDIYUsable: true,
      disposalInstructions: 'Flatten and dispose in paper recycling bin',
      diyIdeas: [
        {
          title: 'Storage Box',
          description: 'Reinforce and decorate for a stylish storage solution',
          difficultyLevel: 'Medium'
        }
      ]
    },
    'E-Waste': {
      name: 'Old smartphone',
      isDIYUsable: false,
      disposalInstructions: 'Take to e-waste collection center. Never dispose with regular trash.',
      diyIdeas: []
    }
  };
  
  return {
    name: items[category].name,
    category: category,
    isDIYUsable: items[category].isDIYUsable,
    disposalInstructions: items[category].disposalInstructions,
    diyIdeas: items[category].diyIdeas,
    pointsAwarded: 5
  };
};

// @desc    Analyze waste image
// @route   POST /api/waste/analyze
// @access  Private
exports.analyzeWaste = asyncHandler(async (req, res) => {
  const { imageData } = req.body;
  
  if (!imageData) {
    res.status(400);
    throw new Error('Please upload an image');
  }
  
  // Analyze the image
  const wasteAnalysis = await analyzeWasteImage(imageData);
  
  // Award points to the user if they're logged in
  if (req.user) {
    const user = await User.findById(req.user._id);
    user.points += wasteAnalysis.pointsAwarded;
    user.itemsRecycled += 1;
    await user.save();
  }
  
  res.status(200).json({
    ...wasteAnalysis,
    userPoints: req.user ? req.user.points + wasteAnalysis.pointsAwarded : null
  });
});

// @desc    Get waste item by barcode
// @route   GET /api/waste/barcode/:code
// @access  Public
exports.getWasteByBarcode = asyncHandler(async (req, res) => {
  const barcodeId = req.params.code;
  
  const wasteItem = await WasteItem.findOne({ barcodeId });
  
  if (!wasteItem) {
    // If not found in our database, provide a generic response
    // In a real app, you might query an external product database
    res.status(404);
    throw new Error('Item not found in our database. Please upload an image for analysis.');
  }
  
  res.status(200).json(wasteItem);
});

// @desc    Get DIY ideas
// @route   GET /api/waste/diy-ideas
// @access  Public
exports.getDIYIdeas = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  let query = {};
  
  if (category) {
    query.category = category;
  }
  
  query.isDIYUsable = true;
  
  const wasteItems = await WasteItem.find(query).select('name diyIdeas');
  
  // Flatten to get all DIY ideas
  const diyIdeas = wasteItems.flatMap(item => 
    item.diyIdeas.map(idea => ({
      ...idea.toObject(),
      itemName: item.name
    }))
  );
  
  res.status(200).json(diyIdeas);
});

// @desc    Get leaderboard
// @route   GET /api/waste/leaderboard
// @access  Public
exports.getLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select('name points itemsRecycled')
    .sort({ points: -1 })
    .limit(10);
  
  res.status(200).json(users);
});