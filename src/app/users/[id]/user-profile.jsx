"use client";

import { useEffect, useState } from "react";

// Global coordinates for 10 users
const fakeCoordinates = {
  1: { lat: 40.748817, lng: -73.985428 },    // New York, USA (Empire State Building)
  2: { lat: 48.8566, lng: 2.3522 },          // Paris, France (Eiffel Tower)
  3: { lat: 35.6895, lng: 139.6917 },        // Tokyo, Japan (Shibuya Crossing)
  4: { lat: -33.8688, lng: 151.2093 },       // Sydney, Australia (Sydney Opera House)
  5: { lat: 55.7558, lng: 37.6173 },         // Moscow, Russia (Red Square)
  6: { lat: 52.5200, lng: 13.4050 },         // Berlin, Germany (Brandenburg Gate)
  7: { lat: -23.5505, lng: -46.6333 },       // São Paulo, Brazil (Avenida Paulista)
  8: { lat: 31.2304, lng: 121.4737 },        // Shanghai, China (The Bund)
  9: { lat: 28.6139, lng: 77.2090 },         // New Delhi, India (India Gate)
  10: { lat: 51.5074, lng: -0.1278 }         // London, UK (Big Ben)
};

export default function UserProfile({ params }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = parseInt(params.id); // Ensure it's a number
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        // Step 2: Override geo location with global coordinates
        const coordinates = fakeCoordinates[userId];
        if (coordinates) {
          data.address.geo.lat = coordinates.lat.toString();
          data.address.geo.lng = coordinates.lng.toString();
        }

        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [params]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  const lat = parseFloat(user.address.geo.lat);
  const lng = parseFloat(user.address.geo.lng);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>

      <div className="mt-4 h-64 w-full rounded-lg overflow-hidden">
        {!isNaN(lat) && !isNaN(lng) ? (
          <iframe
            title="User Location"
            width="100%"
            height="100%"
            className="rounded-lg shadow-md border-0"
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            loading="lazy"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No valid map data</p>
        )}
      </div>
    </div>
  );
}
