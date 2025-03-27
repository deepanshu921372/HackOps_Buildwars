// server/utils/imageProcessing.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Process and optimize uploaded image
 * @param {Buffer} buffer - Image buffer
 * @param {Object} options - Processing options
 * @returns {Promise<Buffer>} Processed image buffer
 */
exports.processImage = async (buffer, options = {}) => {
  const {
    width = 800,
    height = 800,
    quality = 80,
    format = 'jpeg'
  } = options;

  try {
    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .toFormat(format, { quality })
      .toBuffer();

    return processedImageBuffer;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
};

/**
 * Save image to file system
 * @param {Buffer} buffer - Image buffer
 * @param {string} filename - File name
 * @param {string} folder - Destination folder
 * @returns {Promise<string>} Path to saved image
 */
exports.saveImage = async (buffer, filename, folder = 'uploads') => {
  try {
    // Create folder if it doesn't exist
    const uploadDir = path.join(__dirname, '..', folder);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Create unique filename
    const uniqueFilename = `${path.parse(filename).name}-${Date.now()}${path.extname(filename)}`;
    const filepath = path.join(uploadDir, uniqueFilename);
    
    // Write file
    await fs.promises.writeFile(filepath, buffer);
    
    // Return relative path
    return path.join(folder, uniqueFilename);
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
};

/**
 * Extract metadata from image
 * @param {Buffer} buffer - Image buffer
 * @returns {Promise<Object>} Image metadata
 */
exports.getImageMetadata = async (buffer) => {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: buffer.length
    };
  } catch (error) {
    console.error('Error extracting image metadata:', error);
    throw new Error('Failed to extract image metadata');
  }
};

/**
 * Convert base64 image data to buffer
 * @param {string} base64Data - Base64 encoded image data
 * @returns {Buffer} Image buffer
 */
exports.base64ToBuffer = (base64Data) => {
  // Remove data URL prefix if present
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  
  // Convert to buffer
  try {
    return Buffer.from(base64Image, 'base64');
  } catch (error) {
    console.error('Error converting base64 to buffer:', error);
    throw new Error('Invalid base64 image data');
  }
};

/**
 * Determine image type from buffer
 * @param {Buffer} buffer - Image buffer
 * @returns {Promise<string>} Image MIME type
 */
exports.getImageType = async (buffer) => {
  try {
    const metadata = await sharp(buffer).metadata();
    return `image/${metadata.format}`;
  } catch (error) {
    console.error('Error determining image type:', error);
    throw new Error('Failed to determine image type');
  }
};