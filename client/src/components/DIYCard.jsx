// client/src/components/DIYCard.jsx
import React from 'react';

const DIYCard = ({ idea }) => {
  // Helper function to determine difficulty badge color
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card overflow-hidden transition-all duration-200 hover:shadow-lg">
      {idea.imageUrl && (
        <div className="h-48 bg-gray-200">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{idea.title}</h3>
          <span 
            className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(idea.difficultyLevel)}`}
          >
            {idea.difficultyLevel}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{idea.description}</p>
        
        {idea.materials && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Materials Needed:</h4>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {idea.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
        )}
        
        {idea.tutorialLink && (
          <div className="mt-4">
            <a 
              href={idea.tutorialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
            >
              View Tutorial
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DIYCard;