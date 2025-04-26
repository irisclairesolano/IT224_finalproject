'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (

        <nav className="mt-8 space-y-4 text-gray-700 px-4">
          <Link href="/" className="block hover:text-blue-500">📊 Dashboard</Link>
          <Link href="/manage-users" className="block hover:text-blue-500">👥 Manage Users</Link>
          <Link href="/manage-posts" className="block hover:text-blue-500">📝 Manage Posts</Link>
          <Link href="/admin-profile" className="block hover:text-blue-500">👑 My Admin Profile</Link>
        </nav>



 
  );
}
