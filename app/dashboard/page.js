// components/TestMap.js
'use client'; 

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export default function TestMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpc3RoZWZsbG93ZXIiLCJhIjoiY205cno3OTF5MHR4MjJqc2M1dXYwbDQ3MyJ9.jGDAEq0XbnSo2hLtzKlZXA';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [120.9605, 14.6760], // Example: Manila coordinates
      zoom: 10,
    });
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}