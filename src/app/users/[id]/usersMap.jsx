'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const UserMap = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null); // Store map instance

  useEffect(() => {
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid coordinates:', { latitude, longitude });
      return;
    }

    // Initialize map only once
    if (!mapRef.current && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 24,
      });

      // Add marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(map);

      mapRef.current = map; // Store map instance
    }

    // Update map center if coordinates change
    if (mapRef.current) {
      mapRef.current.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg shadow-md" />;
};

export default UserMap;