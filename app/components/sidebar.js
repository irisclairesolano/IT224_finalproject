'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is visible by default

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
        className={`${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed md:relative h-[calc(100vh-64px)] w-64 bg-white border-r transition-all duration-300 z-40`}
          


        
      //   className={`${
      //     isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      //   } fixed md:relative h-[calc(100vh-64px)] w-64 bg-white border-r transition-all duration-300 z-40`}
      // >
      //   <Sidebar />
      // </aside>
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
        // className={`flex-1 min-h-screen p-8 bg-gray-100 transition-all duration-300 ${
        //   isSidebarOpen ? 'ml-64' : 'ml-0' // When sidebar is open, shift content
        // }`}
      >
        
      </main> */}
    </div>
  );
}
