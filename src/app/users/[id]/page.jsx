
'use client';

import dynamic from 'next/dynamic';

// Dynamically import your UserProfile so it runs as a client component
const UserProfile = dynamic(() => import('./user-profile'), { ssr: false });

export default function Page({ params }) {
  return <UserProfile params={params} />;
}
