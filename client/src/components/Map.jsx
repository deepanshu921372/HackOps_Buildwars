// client/src/components/Map.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ selectedLocation, recyclingCenters = [] }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Create map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([40.712776, -74.005974], 13);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Update view if location is selected
    if (selectedLocation) {
      mapRef.current.setView([selectedLocation.lat, selectedLocation.lng], 13);
      
      // Add marker for selected location
      const userIcon = L.icon({
        iconUrl: '/assets/user-location.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      
      L.marker([selectedLocation.lat, selectedLocation.lng], { icon: userIcon })
        .addTo(mapRef.current)
        .bindPopup('Your location')
        .openPopup();
      
      // Add markers for recycling centers
      const centerIcon = L.icon({
        iconUrl: '/assets/recycling-center.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      
      // Mock locations for the centers
      const centerLocations = [
        { lat: selectedLocation.lat + 0.01, lng: selectedLocation.lng + 0.01 },
        { lat: selectedLocation.lat - 0.01, lng: selectedLocation.lng + 0.02 },
        { lat: selectedLocation.lat + 0.02, lng: selectedLocation.lng - 0.01 },
      ];
      
      recyclingCenters.forEach((center, index) => {
        const location = centerLocations[index] || { 
          lat: selectedLocation.lat + (Math.random() * 0.04 - 0.02), 
          lng: selectedLocation.lng + (Math.random() * 0.04 - 0.02) 
        };
        
        L.marker([location.lat, location.lng], { icon: centerIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <strong>${center.name}</strong><br>
            ${center.address}<br>
            <small>Accepts: ${center.items.join(', ')}</small>
          `);
      });
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        // We don't destroy the map to prevent re-initialization,
        // but we clear any markers that might have been added
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapRef.current.removeLayer(layer);
          }
        });
      }
    };
  }, [selectedLocation, recyclingCenters]);

  return (
    <div ref={mapContainerRef} className="w-full h-full"></div>
  );
};

export default Map;