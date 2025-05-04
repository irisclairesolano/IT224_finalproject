
'use client';

import dynamic from 'next/dynamic';

// Dynamically import your UserProfile so it runs as a client component
const UserPosts = dynamic(() => import('./user-posts'), { ssr: false });

export default function Page({ params }) {
  return <UserPosts params={params} />;
}
