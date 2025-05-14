'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
};

const fetchUser = async (id: number): Promise<User> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user ${id}`);
  }
  return res.json();
};

export default function ManageUsers() {
  const queryClient = useQueryClient();

const router = useRouter();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000
  });

  const prefetchUser = (userId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
      staleTime: 5 * 60 * 1000
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-pulse flex space-x-4 justify-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-12 w-12 rounded-full"></div>
            ))}
          </div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-md rounded shadow">
          <h3 className="font-bold text-lg mb-2">Error Loading Data</h3>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            aria-label="Retry loading users"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">User Management</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              onMouseEnter={() => prefetchUser(user.id)}
              prefetch={false} // Let react-query handle prefetching
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="truncate">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{user.address.city}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}