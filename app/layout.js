// app/layout.js

'use client'; // Mark this as a Client Component if using hooks

import Header from './components/header'; // Adjust the path if necessary
import Footer from './components/footer'; // Adjust the path if necessary
import Sidebar from './components/sidebar'; // Adjust the path if necessary

export default function Layout({ children }) {
  return (
    <html lang="en"> {/* Add the <html> tag */}
      <body>
        <Header />
        <div className="flex flex-grow relative">
          <Sidebar />
          <main className="flex-grow p-8 mt-16 mb-16 transition-all duration-300 ease-in-out">
            {children} {/* This is where the child components will be rendered */}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}