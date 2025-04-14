// app/page.js

'use client'; // Add this line to mark this as a Client Component

import { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to Header */}
      <div className="flex flex-grow relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-8 mt-16 mb-16 transition-all duration-300 ease-in-out">
          <h1 className="text-4xl font-bold text-blue-500 text-center">
            Welcome to My Social App
          </h1>
        </main>
      </div>
      <Footer />
    </div>
  );
}
