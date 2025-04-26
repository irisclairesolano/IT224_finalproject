// app/auth/signin/page.jsx
'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false, // to handle manually
      username,
      password,
    });

    if (res?.error) {
      setError('Invalid username or password');
    } else {
      // Redirect user after successful sign in
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold">Sign In</h2>
        
        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Email input */}
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
