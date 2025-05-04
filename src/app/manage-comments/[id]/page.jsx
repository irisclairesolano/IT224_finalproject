
'use client';

import dynamic from 'next/dynamic';

// Dynamically import your UserProfile so it runs as a client component
const UserComments = dynamic(() => import('./user-comments'), { ssr: false });

export default function Page({ params }) {
  return <UserComments params={params} />;
}
