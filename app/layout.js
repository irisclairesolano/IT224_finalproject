'use client'; // Add this line to mark this as a Client Component

import '../public/styles/globals.css';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content Area (Sidebar + Main Content) */}
        <div className="flex flex-col md:flex-row flex-1 w-full">
          {/* Sidebar */}
          <div className="flex-1 p-6 bg-white shadow-lg rounded-lg md:ml-4 mt-4 md:mt-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="w-full md:w-1/4 bg-gray-800 text-white p-4">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
