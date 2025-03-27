// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          const res = await api.get('/api/auth/me');
          setCurrentUser(res.data);
        } catch (error) {
          // Token might be expired or invalid
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    const res = await api.post('/api/auth/register', userData);
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setCurrentUser(res.data);
    }
    
    return res.data;
  };

  // Login user
  const login = async (userData) => {
    const res = await api.post('/api/auth/login', userData);
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setCurrentUser(res.data);
    }
    
    return res.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const updateUserPoints = (points) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        points
      });
    }
  };

  const value = {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    updateUserPoints
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};