// app/page.js

'use client'; // Add this line to mark this as a Client Component

import Layout from './layout';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        Welcome to My Social App
      </h1>
      {/* You can add more components or content here */}
    </Layout>
  );
}