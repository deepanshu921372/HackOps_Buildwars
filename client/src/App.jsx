// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Scan from './pages/Scan';
import About from './pages/About';
import Map from './components/Map';
// Components
import ChatBot from './components/ChatBot';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/scan" element={<PrivateRoute><Scan /></PrivateRoute>} />
        <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
      </Routes>
      
      {/* ChatBot is available on all pages */}
      {/* <ChatBot /> */}
    </>
  );
}

export default App;