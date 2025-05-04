// components/UserMap.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Libreng token mula sa Mapbox (sign up sa https://www.mapbox.com/)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const UserMap = ({ latitude, longitude }) => {
  // 1. Create a reference to the map container (div na lalagyan ng mapa)
  const mapContainer = useRef(null);

  // 2. Initialize the map when the component loads
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Div na gagamitin para sa mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Itsura ng mapa
      center: [longitude, latitude], // [Longitude, Latitude]
      zoom: 12, // Zoom level (12 = malapit)
    });

    // 3. Add a marker (tuldok sa mapa)
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    // 4. Cleanup: tanggalin ang mapa kapag na-unmount ang component
    return () => map.remove();
  }, [latitude, longitude]);

  // 5. Return the div na lalagyan ng mapa
  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default UserMap;