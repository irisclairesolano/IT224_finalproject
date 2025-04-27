'use client';

import './globals.css';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import Providers from './provider';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="relative z-0 flex flex-col min-h-screen bg-gray-100">
        <Providers>
          <AuthWrapper>{children}</AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session && !isAuthRoute) {
      router.replace('/auth/signin');
    }

    if (session && isAuthRoute) {
      router.replace('/');
    }
  }, [session, status, isAuthRoute, router]);

  // ⚡ While loading, DO NOT render anything yet
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // ⚡ If not session and not on auth route, BLOCK RENDER para di makita yung protected page
  if (!session && !isAuthRoute) {
    return null;
  }

  // ⚡ If already authenticated, but nasa auth page (ex: /auth/signin), BLOCK para di makita signin page
  if (session && isAuthRoute) {
    return null;
  }

  // ⚡ Otherwise, okay na, render normal
  return (
    <>
      {isAuthRoute ? (
        <>{children}</>
      ) : (
        <>
          <div className="fixed top-0 left-0 w-full z-50">
            <Header />
          </div>

          <div className="flex flex-1 pt-16">
            <aside className="fixed md:relative h-[calc(100vh-64px)] w-64 bg-white border-r z-40">
              <Sidebar />
            </aside>

            <main className="flex-1">
              {children}
            </main>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
