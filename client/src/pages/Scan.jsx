// client/src/pages/Scan.jsx
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import * as ort from 'onnxruntime-web';

// Initialize ONNX options
const options = {
  executionProviders: ['wasm'],
  graphOptimizationLevel: 'all'
};

const Scan = () => {
  const { updateUserPoints } = useAuth();
  const [scanStep, setScanStep] = useState('initial'); // 'initial', 'scanning', 'results'
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        processImageWithONNX(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Process image with ONNX model
  const processImageWithONNX = async (imageData) => {
    setIsLoading(true);
    try {
      console.log('Starting image processing...');
      
      // Create form data to send the image
      const formData = new FormData();
      // Convert base64 image data to blob
      const blob = await fetch(imageData).then(r => r.blob());
      formData.append('image', blob, 'image.jpg');

      // Send image to backend API
      const response = await fetch('http://localhost:5002/api/analyze-waste', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const results = await response.json();
      console.log('Model results:', results);

      // Process the results
      const processedResults = {
        name: results.detected_class,
        category: results.category,
        confidence: results.confidence,
        isDIYUsable: results.is_diy_usable,
        disposalInstructions: getDisposalInstructions(results.category),
        diyIdeas: getDIYIdeas(results.category),
        pointsAwarded: results.total_points,
        userPoints: results.total_points + 100, // Base points + earned points
      };

      console.log('Processed results:', processedResults);
      
      setScanResults(processedResults);
      updateUserPoints(processedResults.userPoints);
      setScanStep('results');
      
      console.log('Image processing completed successfully');
    } catch (error) {
      console.error('Detailed error:', error);
      setError(`Failed to analyze the image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to calculate points based on category
  const calculatePoints = (category) => {
    const pointsMap = {
      'Recyclable': 10,
      'Biodegradable': 8,
      'Hazardous': 5,
      'Electronic': 7,
      // Add more categories as needed
    };
    return pointsMap[category] || 5;
  };
  
  // Helper function to get disposal instructions by category
  const getDisposalInstructions = (category) => {
    const instructions = {
      'Plastic': 'Clean and place in the plastic recycling bin. Remove labels and caps if possible.',
      'Glass': 'Rinse thoroughly and place in the glass recycling bin. Remove any non-glass components.',
      'Paper': 'Flatten and place in the paper recycling bin. Remove any plastic or metal components.',
      'Metal': 'Rinse and place in the metal recycling bin. Make sure it is completely empty.',
      'E-Waste': 'Take to a designated e-waste collection center. Do not dispose with regular trash.',
      'Biodegradable': 'Place in compost or biodegradable waste bin. Do not mix with non-biodegradable waste.',
    };
    
    return instructions[category] || 'Please take to a recycling center for proper disposal.';
  };
  
  // Helper function to get DIY ideas by category
  const getDIYIdeas = (category) => {
    const ideas = {
      'Plastic': [
        {
          title: 'Plant Pot',
          description: 'Cut the bottle in half and use the bottom part as a plant pot. Add drainage holes at the bottom.',
          difficultyLevel: 'Easy',
        },
        {
          title: 'Bird Feeder',
          description: 'Create small openings in the sides for bird access. Add perches with wooden sticks and fill with bird seeds.',
          difficultyLevel: 'Medium',
        },
      ],
      'Glass': [
        {
          title: 'Storage Container',
          description: 'Clean thoroughly and use for storing dry goods, spices, or homemade jams.',
          difficultyLevel: 'Easy',
        },
        {
          title: 'Candle Holder',
          description: 'Decorate the outside with paint or decoupage, and place a tea light inside for a beautiful ambient light.',
          difficultyLevel: 'Easy',
        },
      ],
      'Paper': [
        {
          title: 'Storage Box',
          description: 'Reinforce with duct tape and decorate with wrapping paper or fabric for a stylish storage box.',
          difficultyLevel: 'Medium',
        },
        {
          title: 'Seed Starter Pots',
          description: 'Cut into smaller sections, fold the bottom, and use as biodegradable seed starter pots.',
          difficultyLevel: 'Easy',
        },
      ],
      'Metal': [
        {
          title: 'Pencil Holder',
          description: 'Clean thoroughly, remove any sharp edges, and decorate with paint or washi tape.',
          difficultyLevel: 'Easy',
        },
        {
          title: 'Mini Planter',
          description: 'Add drainage holes at the bottom, paint the outside, and plant small succulents or herbs.',
          difficultyLevel: 'Medium',
        },
      ],
      'E-Waste': [
        {
          title: 'Circuit Board Art',
          description: 'If you have old circuit boards, clean them and frame them for a unique piece of tech art.',
          difficultyLevel: 'Hard',
        },
      ],
      'Biodegradable': [
        {
          title: 'Compost',
          description: 'Add to your compost pile to create nutrient-rich soil for your garden.',
          difficultyLevel: 'Easy',
        },
      ],
    };
    
    return ideas[category] || [];
  };
  
  // Handle closing the camera or going back to start
  const handleClose = () => {
    setSelectedImage(null);
    setScanResults(null);
    setError(null);
    setScanStep('initial');
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Upload Waste Item
          </h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {scanStep === 'initial' && (
              <div className="p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="mb-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Upload an Image</h2>
                <p className="text-gray-600 mb-8">
                  Select a clear image of your waste item for analysis
                </p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn-primary py-3 px-8"
                >
                  Choose File
                </button>
              </div>
            )}
            
            {scanStep === 'results' && scanResults && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Scanned item"
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold">Scan Results</h2>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        +{scanResults.pointsAwarded} points
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Item Name</p>
                          <p className="font-medium">{scanResults.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{scanResults.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Confidence</p>
                          <p className="font-medium">{(scanResults.confidence * 100).toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">DIY Usable</p>
                          <p className="font-medium">
                            {scanResults.isDIYUsable ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">How to Dispose</h3>
                      <p className="text-gray-700">
                        {scanResults.disposalInstructions}
                      </p>
                    </div>
                    
                    {scanResults.isDIYUsable && scanResults.diyIdeas.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">DIY Ideas</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {scanResults.diyIdeas.map((idea, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold mb-1">{idea.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                idea.difficultyLevel === 'Easy'
                                  ? 'bg-green-100 text-green-800'
                                  : idea.difficultyLevel === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {idea.difficultyLevel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t flex justify-between">
                  <button
                    onClick={handleClose}
                    className="btn-outline"
                  >
                    Scan New Item
                  </button>
                  <button
                    onClick={() => {
                      // In a real app, this would navigate to a detailed view or saved items
                      // alert('Item details saved!');
                    }}
                    className="btn-primary"
                  >
                    Save Details
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-6 text-center">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-red-800 mb-2">Scanning Error</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {isLoading && (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mb-6"></div>
                <h3 className="text-xl font-medium mb-2">Analyzing your item...</h3>
                <p className="text-gray-600">
                  Please wait while our AI identifies the item and provides recycling information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Scan;