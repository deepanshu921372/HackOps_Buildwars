// server/routes/wasteRoutes.js
const express = require('express');
const { 
  analyzeWaste, 
  getWasteByBarcode, 
  getDIYIdeas, 
  getLeaderboard 
} = require('../controllers/wasteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/analyze', protect, analyzeWaste);
router.get('/barcode/:code', getWasteByBarcode);
router.get('/diy-ideas', getDIYIdeas);
router.get('/leaderboard', getLeaderboard);

module.exports = router;