// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = ({ landingPage = false }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="RIY Logo"
                />
                <span className="ml-2 text-xl font-bold text-black">Recycle it Yourself</span>
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!landingPage && (
              <>
                <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors duration-200">
                  Home
                </Link>
                <Link to="/scan" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors duration-200">
                  Scan
                </Link>
              </>
            )}
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors duration-200">
              About Us
            </Link>
            
            {currentUser ? (
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="mr-4 text-sm text-white">{currentUser.points} Points</span>
                  <button
                    onClick={handleLogout}
                    className="btn-outline text-sm text-white hover:text-gray-200 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-3 relative">
                <Link to="/login" className="btn-outline text-sm mr-2 text-white hover:text-gray-200 transition-colors duration-200">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm text-white hover:text-gray-200 transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {!landingPage && (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/scan"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Scan
              </Link>
            </>
          )}
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          
          {currentUser ? (
            <>
              <div className="px-3 py-2 text-base font-medium text-gray-700">
                {currentUser.points} Points
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;