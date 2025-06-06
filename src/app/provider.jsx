// app/providers.js
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    </SessionProvider>
  );
}