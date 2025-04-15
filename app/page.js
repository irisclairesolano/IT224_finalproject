// app/page.js

'use client'; // Add this line to mark this as a Client Component

import Layout from './layout'; // Ensure the path and casing are correct



export default function Home() {
  return (
    // <Layout>
    <div>
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        Welcome to My Social App
      </h1>
      <p>This is the home page of our SPA.</p>
      </div>
    //   </Layout>
  );
}