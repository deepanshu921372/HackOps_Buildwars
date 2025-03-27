// client/src/components/ChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your RIY assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Mock recycling centers for demo
  const mockRecyclingCenters = [
    {
      id: 1,
      name: 'City Recycling Center',
      distance: '1.2 miles',
      address: '123 Green St, City',
      items: ['Plastic', 'Paper', 'Glass', 'Metal'],
    },
    {
      id: 2,
      name: 'EcoFriendly Disposal',
      distance: '2.5 miles',
      address: '456 Earth Ave, City',
      items: ['E-Waste', 'Batteries', 'Hazardous'],
    },
    {
      id: 3,
      name: 'Community Recycling Hub',
      distance: '3.8 miles',
      address: '789 Recycle Blvd, City',
      items: ['Biodegradable', 'Plastic', 'Glass'],
    },
  ];

  // Mock address auto-complete
  const mockAddresses = [
    '123 Main St, Anytown, USA',
    '456 Oak Ave, Somewhere, USA',
    '789 Pine Rd, Nowhere, USA',
    '101 Maple Dr, Everywhere, USA',
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowMap(false);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Only show address auto-complete if we're in map mode
    if (showMap && e.target.value.length > 2) {
      const filteredAddresses = mockAddresses.filter(addr => 
        addr.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(filteredAddresses);
    } else {
      setSearchResults([]);
    }
  };

  const selectAddress = (address) => {
    setSearchAddress(address);
    setSearchResults([]);
    setNewMessage('');
    
    // Simulate finding the location
    setSelectedLocation({
      lat: 40.712776,
      lng: -74.005974,
    });
    
    // Add a message confirming the address
    addMessage(`I'll look for recycling centers near: ${address}`, 'user');
    
    // Simulate bot response with recycling centers
    setTimeout(() => {
      addMessage(
        "I found these recycling centers near you:",
        'bot'
      );
      
      mockRecyclingCenters.forEach((center, index) => {
        setTimeout(() => {
          addMessage({
            type: 'recyclingCenter',
            data: center
          }, 'bot');
        }, (index + 1) * 500);
      });
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    if (showMap) {
      // If map is showing and we have a message but no results selected,
      // treat it as a search request
      if (searchResults.length === 0 && !selectedLocation) {
        setSearchAddress(newMessage);
        selectAddress(newMessage);
      }
      return;
    }
    
    // Regular chat mode
    addMessage(newMessage, 'user');
    
    // Process keywords in message to simulate intelligent responses
    const lowerMsg = newMessage.toLowerCase();
    
    setTimeout(() => {
      if (lowerMsg.includes('recycle') && (lowerMsg.includes('where') || lowerMsg.includes('place') || lowerMsg.includes('center'))) {
        addMessage("I can help you find recycling centers near you. Please share your location or enter an address.", 'bot');
        setShowMap(true);
      } 
      else if (lowerMsg.includes('scan') || lowerMsg.includes('camera')) {
        addMessage("Would you like to scan an item to determine its recyclability? I'll take you to our scanner.", 'bot');
        setTimeout(() => {
          navigate('/scan');
          setIsOpen(false);
        }, 1500);
      }
      else if (lowerMsg.includes('plastic') || lowerMsg.includes('glass') || lowerMsg.includes('paper') || lowerMsg.includes('metal')) {
        addMessage(`Yes, ${extractMaterial(lowerMsg)} is recyclable! Remember to clean it before recycling. Would you like to find a recycling center near you?`, 'bot');
      }
      else if (lowerMsg.includes('diy') || lowerMsg.includes('reuse')) {
        addMessage("Here are some DIY ideas for reusing common waste items:", 'bot');
        setTimeout(() => {
          addMessage({
            type: 'diyIdea',
            data: {
              title: 'Plant Pot from Plastic Bottle',
              description: 'Cut a plastic bottle in half and use the bottom part as a small plant pot. Add drainage holes at the bottom.'
            }
          }, 'bot');
          setTimeout(() => {
            addMessage({
              type: 'diyIdea',
              data: {
                title: 'Tin Can Pencil Holder',
                description: 'Clean an empty tin can, sand any sharp edges, and decorate it to create a pencil or utensil holder.'
              }
            }, 'bot');
          }, 500);
        }, 500);
      }
      else {
        addMessage("I can help with recycling information, finding recycling centers near you, or scanning items to determine their recyclability. What would you like to know?", 'bot');
      }
    }, 1000);
    
    setNewMessage('');
  };
  
  const extractMaterial = (message) => {
    if (message.includes('plastic')) return 'plastic';
    if (message.includes('glass')) return 'glass';
    if (message.includes('paper')) return 'paper';
    if (message.includes('metal')) return 'metal';
    return 'that material';
  };

  const addMessage = (content, sender) => {
    const newMsg = {
      id: Date.now(),
      text: content,
      sender,
    };
    
    setMessages(prev => [...prev, newMsg]);
  };

  const closeMap = () => {
    setShowMap(false);
    setSearchAddress('');
    setSearchResults([]);
    setSelectedLocation(null);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary-500 text-white rounded-full p-4 shadow-lg z-50 hover:bg-primary-600 transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col">
          <div className="p-4 bg-primary-500 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">RIY Assistant</h3>
          </div>

          {showMap ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-2 flex justify-between items-center border-b">
                <button 
                  onClick={closeMap} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium">Find Recycling Centers</span>
                <div className="w-5"></div>
              </div>
              
              <div className="flex-1 relative">
                <Map selectedLocation={selectedLocation} recyclingCenters={mockRecyclingCenters} />
              </div>
              
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={searchAddress}
                  onChange={(e) => {
                    setSearchAddress(e.target.value);
                    handleInputChange(e);
                  }}
                  className="w-full p-3 border-t focus:outline-none"
                  placeholder="Enter your address or location"
                />
                
                {searchResults.length > 0 && (
                  <div className="absolute bottom-full left-0 w-full bg-white border rounded-t-md shadow-md max-h-48 overflow-y-auto z-10">
                    {searchResults.map((address, index) => (
                      <div 
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectAddress(address)}
                      >
                        {address}
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {typeof message.text === 'string' ? (
                      <div
                        className={`inline-block rounded-lg px-4 py-2 max-w-xs ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                    ) : (
                      // Render special message types
                      <div
                        className={`inline-block rounded-lg px-4 py-2 max-w-xs text-left ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {message.text.type === 'recyclingCenter' && (
                          <div className="recycling-center">
                            <div className="font-bold">{message.text.data.name}</div>
                            <div>{message.text.data.address}</div>
                            <div className="text-sm">Distance: {message.text.data.distance}</div>
                            <div className="text-sm">
                              Accepts: {message.text.data.items.join(', ')}
                            </div>
                          </div>
                        )}
                        
                        {message.text.type === 'diyIdea' && (
                          <div className="diy-idea">
                            <div className="font-bold">{message.text.data.title}</div>
                            <div>{message.text.data.description}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="border-t p-2 flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  className="flex-1 p-2 focus:outline-none"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="ml-2 bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600"
                  disabled={!newMessage.trim()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;