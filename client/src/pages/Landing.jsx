// client/src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import banner from '../assets/banner.png';
import pot from '../assets/pot.png';
import jar from '../assets/jar.png';
import image from '../assets/image.png';

const Landing = () => {
  // Sample DIY ideas
  const diyIdeas = [
    {
      title: 'Plant Pot from Plastic Bottle',
      description: 'Transform plastic bottles into colorful plant pots for your garden.',
      image: pot,
    },
    {
      title: 'Glass Jar Lanterns',
      description: 'Repurpose glass jars into beautiful lanterns for your home decor.',
      image: jar,
    },
    {
      title: 'Cardboard Organizers',
      description: 'Create desk organizers from cardboard boxes and toilet paper rolls.',
      image: image,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar landingPage={true} />
      
      {/* Hero Section - Enhanced */}
      <section className="bg-gradient-to-r from-emerald-500 via-green-900 to-green-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>
          <div className="flex flex-col lg:flex-row items-center relative">
            <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Smart Waste Segregation Made Easy
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Scan, segregate, and find the nearest recycling centers all in one app. Join the movement for a cleaner planet.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="btn bg-white text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="btn border-2 border-white text-white hover:bg-white/10 transition-all duration-300 font-bold py-4 px-8 rounded-xl"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src={banner}
                alt="Smart waste segregation"
                className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              How EcoSort Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to make waste management smarter and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card p-8 rounded-2xl bg-white border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Upload Waste Items
              </h3>
              <p className="text-gray-600">
                Use your camera to scan waste items or their barcodes, and our AI will identify what they're made of.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-8 rounded-2xl bg-white border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Recycling Information
              </h3>
              <p className="text-gray-600">
                Learn how to properly dispose of items or get creative DIY ideas to reuse and upcycle your waste.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-8 rounded-2xl bg-white border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Find Recycling Centers
              </h3>
              <p className="text-gray-600">
                Locate the nearest recycling centers and drop-off points for different types of waste.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* DIY Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              Creative DIY Recycling Ideas
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Transform your waste into something useful and beautiful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {diyIdeas.map((idea, index) => (
              <div key={index} className="group rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="h-56 overflow-hidden">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600">
                    {idea.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Join EcoSort to Discover More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Enhanced */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Ready to start your sustainable journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users making a difference for our planet.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <img
                  src="/assets/logo-white.svg"
                  alt="EcoSort Logo"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold">EcoSort</span>
              </div>
              <p className="mt-4 max-w-xs text-gray-400">
                Making waste segregation and recycling easy and accessible for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Product
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} EcoSort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;