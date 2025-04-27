'use client'; 
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ReactMapGL from 'react-map-gl';  // v6 style import

//error response
const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

//fetching hte users
const fetchUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
};

export default function ManageUsers() {
  const queryClient = useQueryClient(); // Correct placement inside component
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) return <div className="min-h-screen p-6 bg-gray-100">Loading users...</div>;
  if (isError) return <div className="min-h-screen p-6 bg-gray-100 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Link 
            key={user.id} 
            href={`/manage-users/${user.id}`}
            className="bg-white shadow-lg p-4 rounded-xl hover:shadow-xl transition block"
            onMouseEnter={() => {
              queryClient.prefetchQuery({
                queryKey: ['user', user.id],
                queryFn: () => fetchUser(user.id)
              });
            }}
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-800">{user.email}</p>
            <p className="text-gray-500 text-sm">📍 {user.address.city}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}