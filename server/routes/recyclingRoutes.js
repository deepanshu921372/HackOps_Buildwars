// server/routes/recyclingRoutes.js
const express = require('express');
const { 
  getNearbyRecyclingCenters,
  getRecyclingCenterById,
  addRecyclingCenter
} = require('../controllers/recyclingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/centers', getNearbyRecyclingCenters);
router.get('/centers/:id', getRecyclingCenterById);
router.post('/centers', protect, addRecyclingCenter); // In a real app, would have admin middleware

module.exports = router;