// app/pages/manage-users.js

'use client';
import React from 'react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Step 1: Add error state

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok'); // Check for response errors
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message)); // Step 2: Catch errors and set error state
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User  List</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Step 3: Display error message */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-lg p-4 rounded-xl hover:shadow-xl transition">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-800">{user.email}</p>
            <p className="text-gray-500 text-sm">📍 {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}