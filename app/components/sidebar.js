'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar is visible by default

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Toggle Button (Hamburger Icon) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-black p-3 rounded-none"
      >
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-all duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-700"
        >
          ❌ {/* Close Icon */}
        </button>
        <nav className="mt-16 space-y-4 text-gray-700 px-4">
          <Link href="/" className="block hover:text-blue-500">📊 Dashboard</Link>
          <Link href="/" className="block hover:text-blue-500">👥 Manage Users</Link>
          <Link href="/" className="block hover:text-blue-500">📝 Manage Posts</Link>
          <Link href="/" className="block hover:text-blue-500">👑 My Admin Profile</Link>
        </nav>
      </aside>

      {/* Main Content
      <main
        className={`flex-1 min-h-screen p-8 bg-gray-100 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0' // When sidebar is open, shift content
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p>Sample content goes here. You can scroll and see the sidebar stay in place.</p>
      </main> */}
    </div>
  );
}
