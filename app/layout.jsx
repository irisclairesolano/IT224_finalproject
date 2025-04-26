'use client';

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import Providers from './provider';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
 


export default  function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
 

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="relative z-0 flex flex-col min-h-screen bg-gray-100">
        {isAuthRoute ? (
          <>{children}</>
        ) : (
          <>
            <div className="fixed top-0 left-0 w-full z-50">
              
              <Header />
            </div>

            
            <div className="flex flex-1 pt-16">
              {/* Sidebar is always visible, no toggle */}
              <aside className="fixed md:relative h-[calc(100vh-64px)] w-64 bg-white border-r z-40">
                <Sidebar />
              </aside>

              {/* Main Content */}
              <SessionProvider>
                <Providers>
                  <main className="flex-1">{children}</main>
                </Providers>
              </SessionProvider>
            </div>

            {/* Footer */}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
