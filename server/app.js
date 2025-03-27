// server/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config({ path: './config/.env' });

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const recyclingRoutes = require('./routes/recyclingRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // For parsing application/json with large images
app.use(express.urlencoded({ extended: false, limit: '50mb' })); // For parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
  if (req.url.endsWith('.onnx')) {
    res.setHeader('Content-Type', 'application/octet-stream');
  }
  if (req.url.endsWith('.wasm')) {
    res.setHeader('Content-Type', 'application/wasm');
  }
  next();
});


// Enable CORS
app.use(cors());

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/recycling', recyclingRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;