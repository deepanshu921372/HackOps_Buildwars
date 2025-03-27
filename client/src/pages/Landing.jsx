// client/src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import banner from '../assets/banner.png';

const Landing = () => {
  // Sample DIY ideas
  const diyIdeas = [
    {
      title: 'Plant Pot from Plastic Bottle',
      description: 'Transform plastic bottles into colorful plant pots for your garden.',
      image: '/assets/diy-plant-pot.jpg',
    },
    {
      title: 'Glass Jar Lanterns',
      description: 'Repurpose glass jars into beautiful lanterns for your home decor.',
      image: '/assets/diy-jar-lantern.jpg',
    },
    {
      title: 'Cardboard Organizers',
      description: 'Create desk organizers from cardboard boxes and toilet paper rolls.',
      image: '/assets/diy-cardboard-organizer.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar landingPage={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-black mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Smart Waste Segregation Made Easy
              </h1>
              <p className="text-xl mb-8">
                Scan, segregate, and find the nearest recycling centers all in one app. Join the movement for a cleaner planet.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/signup"
                  className="btn border-2 border-black text-black hover:bg-gray-100 hover:text-primary-600 font-bold py-3 px-8 rounded-md"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="btn border-2 border-black text-black hover:bg-gray-100 hover:text-primary-600 font-bold py-3 px-8 rounded-md"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src={banner}
                alt="Smart waste segregation"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How EcoSort Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to make waste management smarter and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card p-8 border-2 border-green-500 rounded-lg transition-all duration-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Scan Waste Items
              </h3>
              <p className="text-gray-600">
                Use your camera to scan waste items or their barcodes, and our AI will identify what they're made of.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-8 border-2 border-green-500 rounded-lg transition-all duration-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="card p-8 border-2 border-green-500 rounded-lg transition-all duration-200 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      
      {/* DIY Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Creative DIY Recycling Ideas
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Transform your waste into something useful and beautiful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {diyIdeas.map((idea, index) => (
              <div key={index} className="card overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="h-48 bg-gray-200">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {idea.description}
                  </p>
                  <button className="text-primary-600 font-medium hover:text-primary-700">
                    View Tutorial →
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/signup"
              className="btn-primary py-3 px-8"
            >
              Join EcoSort to Discover More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to start your sustainable journey?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of users making a difference for our planet.
            </p>
            <div className="mt-8">
              <Link
                to="/signup"
                className="btn bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
          
          <div className="mt-12 border-t border-gray-700 pt-8">
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