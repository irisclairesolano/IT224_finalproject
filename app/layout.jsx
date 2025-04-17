'use client'; // This must stay at the top

import { useState } from 'react'; // Add this import
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  return (
    <html lang="en">
      <body className="relative z-0 flex flex-col min-h-screen bg-gray-100">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full z-50">
          {/* Pass the toggle function to Header (if you want a button there) */}
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Wrapper with padding for header */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar with smooth transitions */}
          <aside 
            // className={`${
            //   isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            // } fixed md:relative h-[calc(100vh-64px)] w-64 bg-white border-r transition-all duration-300 z-40`}
          >
            <Sidebar />
          </aside>
          
          {/* Main Content */}
          <main className={`${isSidebarOpen ? 'flex-1' : 'w-full'} `}>
            {children}
          </main>
          </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}