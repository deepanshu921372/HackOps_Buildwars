// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Camera,
  MapPin,
  PlusCircle,
  Clock,
  Lock,
  CheckCircle,
  Leaf,
  Upload
} from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/api/waste/leaderboard');
        setLeaderboard(res.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'Scanning',
      item: 'Plastic Bottle',
      points: 5,
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 2,
      type: 'Recycling',
      item: 'Paper Waste',
      points: 8,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: 3,
      type: 'DIY Reuse',
      item: 'Glass Jar',
      points: 10,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
  ];
  
  // Mock tips
  const ecoTips = [
    "Rinse your recyclables to reduce contamination.",
    "Compost food scraps to reduce landfill waste.",
    "Try to refuse single-use plastics when possible.",
    "Reuse glass jars for storage instead of disposing them.",
    "Consider repairing items before replacing them.",
  ];
  
  // Mock leaderboard if API call fails
  const mockLeaderboard = [
    { _id: '1', name: 'Jane Smith', points: 340, itemsRecycled: 42 },
    { _id: '2', name: 'John Doe', points: 310, itemsRecycled: 38 },
    { _id: '3', name: 'Alex Johnson', points: 285, itemsRecycled: 35 },
    { _id: '4', name: 'Sam Wilson', points: 260, itemsRecycled: 32 },
    { _id: '5', name: 'Taylor Brown', points: 240, itemsRecycled: 30 },
  ];
  
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Just now' : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };
  
  // Get random eco tip
  const getRandomTip = () => {
    return ecoTips[Math.floor(Math.random() * ecoTips.length)];
  };
  
  return (
    <>
      <Navbar/>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r mt-10 from-green-500 to-blue-500 rounded-lg text-white p-6 mx-10 md:mx-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser?.name}!</h1>
                <p className="text-green-100">Your sustainable actions are making a difference.</p>
              </div>
              <div className="flex space-x-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{currentUser?.points || 0}</p>
                  <p className="text-xs uppercase">Total Points</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{currentUser?.itemsRecycled || 0}</p>
                  <p className="text-xs uppercase">Items Recycled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                <div className="grid grid-cols-3 gap-4">
                  <Link to="/scan" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 flex flex-col items-center justify-center transition">
                    <Upload className="text-green-600 mb-2" size={32} />
                    <span className="text-sm text-gray-700">Upload Item</span>
                  </Link>
                  <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center transition">
                    <MapPin className="text-blue-600 mb-2" size={32} />
                    <span className="text-sm text-gray-700">Find Centers</span>
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 flex flex-col items-center justify-center transition">
                    <PlusCircle className="text-purple-600 mb-2" size={32} />
                    <span className="text-sm text-gray-700">DIY Ideas</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Camera className="text-green-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.type}</p>
                          <p className="text-sm text-gray-600">{activity.item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-semibold">+{activity.points} Points</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg flex items-center">
                <Leaf className="text-yellow-600 mr-4" size={32} />
                <div>
                  <h3 className="font-semibold text-yellow-800">Eco Tip of the Day</h3>
                  <p className="text-yellow-700">{getRandomTip()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recycling Leaders</h2>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 uppercase border-b">
                        <th className="py-2 text-left">Rank</th>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(leaderboard.length > 0 ? leaderboard : mockLeaderboard).slice(0, 5).map((user, index) => (
                        <tr 
                          key={user._id}
                          className={`
                            ${currentUser && user._id === currentUser._id ? 'bg-green-50' : 'hover:bg-gray-50'}
                            border-b last:border-b-0
                          `}
                        >
                          <td className="py-3">
                            <span className={`
                              font-bold
                              ${index === 0 ? 'text-yellow-500' : 
                                index === 1 ? 'text-gray-400' : 
                                index === 2 ? 'text-yellow-700' : 'text-gray-700'}
                            `}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="font-medium">
                              {user.name}
                              {currentUser && user._id === currentUser._id && (
                                <span className="text-xs text-green-600 ml-2">(You)</span>
                              )}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-green-600 font-semibold">{user.points}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Achievements</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 p-3 rounded-full mb-2">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <p className="text-xs text-gray-600 text-center">First Scan</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Clock className="text-blue-600" size={24} />
                    </div>
                    <p className="text-xs text-gray-600 text-center">5 Day Streak</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 p-3 rounded-full mb-2">
                      <Lock className="text-gray-400" size={24} />
                    </div>
                    <p className="text-xs text-gray-400 text-center">Locked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;