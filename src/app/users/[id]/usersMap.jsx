"use client";

import React from "react";

const UserMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <p>Invalid coordinates</p>
      </div>
    );
  }

  // Create the Google Maps embed URL with the given latitude and longitude
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <iframe
      title="User Location"
      width="100%"
      height="100%"
      className="rounded-lg shadow-md border-0"
      src={mapSrc}
      loading="lazy"
      allowFullScreen
    ></iframe>
  );
};

export default UserMap;
