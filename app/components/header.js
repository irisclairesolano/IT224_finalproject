// app/components/header.js

'use client'; // Add this line to mark as a Client Component

import React from 'react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-4 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="text-gray-700"
      >
        ☰ {/* This is the Hamburger Icon */}
      </button>
      <h1 className="text-xl font-bold">Snapxz App</h1>
    </header>
  );
}
