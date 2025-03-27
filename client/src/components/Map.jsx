import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";

const GoogleMap = () => {
  const mapRef = useRef(null);

  const locations = [
    { lat: 28.6285, lng: 77.1223, name: "RenewEarth Recycling Facility", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.8425, lng: 77.0864, name: "EcoCycle Recycling Pvt. Ltd.", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.6572, lng: 77.1948, name: "GreenFuture Waste Solutions", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.7390, lng: 77.1395, name: "Sustainable Earth Landfill", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.625244, lng: 77.327990, name: "Ghazipur Landfill", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.511125, lng: 77.284575, name: "Okhla Landfill", link: "https://maps.app.goo.gl/QDbbCCtxeZ4d3x947" },
    { lat: 28.708333, lng: 77.125000, name: "Bhalswa Landfill", link: "https://maps.app.goo.gl/x7KnhpJqWo7VNWrd9" },
    { lat: 28.6890, lng: 77.3142, name: "M/s Fozia Traders", link: "https://maps.app.goo.gl/DZGX4hjpJ2KrjdK8A" },
    { lat: 28.5355, lng: 77.2708, name: "M/s Shivnath Computers", link: "https://maps.app.goo.gl/hBMhekEDhusnj66CA" },
    { lat: 28.5245, lng: 77.2710, name: "M/s Muskan Technologies", link: "https://maps.app.goo.gl/jo2DRj1pPXKeGArt7" },
    { lat: 28.5245, lng: 77.2710, name: "M/s Techchef E-Waste Solutions Pvt. Ltd.", link: "https://maps.app.goo.gl/LECLYnYma7cuq5vU9" },
    { lat: 28.6353, lng: 77.2828, name: "M/s Greenscape Eco Management Pvt. Ltd.", link: "https://maps.app.goo.gl/8ojbufsq7QFq4Pxt5" },
    { lat: 28.6758, lng: 77.0670, name: "M/s Shree Raman E-Waste", link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9" },
    { lat: 28.7983, lng: 77.0340, name: "M/s Brojion Consultancy Pvt. Ltd.", link: "https://maps.app.goo.gl/PY2gs8LcMumkS7pg7" },
    { lat: 28.4966, lng: 77.2962, name: "M/s Taj Computer Solutions Pvt. Ltd.", link: "https://maps.app.goo.gl/71fUuQo7XE2P3QXv5" },
    { lat: 28.6997, lng: 77.1662, name: "M/s Ewaster", link: "https://maps.app.goo.gl/GsGL9EhKuzYvTcMv8" },
    { lat: 28.9800, lng: 77.7064, name: "M/s Sky Green Waste Recycling Management", link: "https://maps.app.goo.gl/MAUqcY8f8AVeGb3M9" },
    { lat: 28.8310, lng: 77.5810, name: "M/s Shiv Shakti Metals", link: "https://maps.app.goo.gl/xRyfrAPpy3bpJHwb9" },
    { lat: 28.3575, lng: 76.9410, name: "M/s Earth Sense Recycle Pvt. Ltd.", link: "https://maps.app.goo.gl/FEVJzs6u3F7qXQRW6" },
    {
      lat: 28.6285,
      lng: 77.1223,
      name: "RenewEarth Recycling Facility",
      link: "https://maps.app.goo.gl/BAzbVPjqykwzqxrc9",
    },
  ];

  const userLocation = { lat: 28.7197, lng: 77.0661 };

  useEffect(() => {
    const loadMap = () => {
      if (!window.google || !mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 12,
      });

      // Add user location marker
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      // Add location markers
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        });

        // Create a custom label div with Tailwind classes
        const labelContent = document.createElement('div');
        labelContent.className = 'bg-white px-2.5 py-1.5 rounded-md shadow-md absolute -translate-x-1/2 -translate-y-8 text-sm whitespace-nowrap hidden group-hover:block';
        labelContent.textContent = location.name;

        // Create InfoWindow for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${location.name}</strong><br><a href="${location.link}" target="_blank">View on Google Maps</a></div>`,
        });

        // Show label on hover
        marker.addListener('mouseover', () => {
          labelContent.style.display = 'block';
        });

        marker.addListener('mouseout', () => {
          labelContent.style.display = 'none';
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbik-pE9k1LZ7WzD3Oc8pgLJeyR-6uDbs`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </>
  );
};

export default GoogleMap;
