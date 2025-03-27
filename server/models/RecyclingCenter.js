// server/models/RecyclingCenter.js
const mongoose = require('mongoose');

const RecyclingCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      // [longitude, latitude]
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  acceptedItems: [{
    type: String,
    enum: ['Biodegradable', 'Plastic', 'Glass', 'Metal', 'Paper', 'E-Waste', 'Hazardous', 'Other']
  }],
  description: String,
  imageUrl: String
}, { timestamps: true });

// Create geospatial index for location-based queries
RecyclingCenterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('RecyclingCenter', RecyclingCenterSchema);