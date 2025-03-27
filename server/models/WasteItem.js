// server/models/WasteItem.js
const mongoose = require('mongoose');

const WasteItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Biodegradable', 'Plastic', 'Glass', 'Metal', 'Paper', 'E-Waste', 'Hazardous', 'Other']
  },
  isDIYUsable: {
    type: Boolean,
    default: false
  },
  disposalInstructions: {
    type: String,
    required: true
  },
  diyIdeas: [{
    title: String,
    description: String,
    difficultyLevel: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard']
    },
    imageUrl: String
  }],
  pointsAwarded: {
    type: Number,
    default: 5
  },
  barcodeId: {
    type: String,
    unique: true,
    sparse: true
  }
}, { timestamps: true });

module.exports = mongoose.model('WasteItem', WasteItemSchema);