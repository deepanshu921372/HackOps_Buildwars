// client/src/components/LeaderboardTable.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const LeaderboardTable = ({ users, isLoading }) => {
  const { currentUser } = useAuth();
  
  // Use mock data if no users are provided
  const mockUsers = [
    { _id: '1', name: 'Jane Smith', points: 340, itemsRecycled: 42 },
    { _id: '2', name: 'John Doe', points: 310, itemsRecycled: 38 },
    { _id: '3', name: 'Alex Johnson', points: 285, itemsRecycled: 35 },
    { _id: '4', name: 'Sam Wilson', points: 260, itemsRecycled: 32 },
    { _id: '5', name: 'Taylor Brown', points: 240, itemsRecycled: 30 },
  ];
  
  const displayUsers = users && users.length > 0 ? users : mockUsers;

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayUsers.map((user, index) => (
            <tr 
              key={user._id}
              className={currentUser && user._id === currentUser._id ? "bg-primary-50" : ""}
            >
              <td className="px-3 py-4 whitespace-nowrap">
                {index < 3 ? (
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-white 
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-700'}`}>
                    {index + 1}
                  </span>
                ) : (
                  <span className="text-gray-900">{index + 1}</span>
                )}
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                    {currentUser && user._id === currentUser._id && (
                      <span className="ml-2 text-xs text-primary-600">(You)</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                <span className="text-primary-600 font-semibold">{user.points}</span>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                <span className="text-gray-700">{user.itemsRecycled}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {displayUsers.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No users found on the leaderboard.
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;