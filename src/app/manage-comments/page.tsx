"use client";

import { useQueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { FiMail, FiMapPin, FiUser, FiFileText } from "react-icons/fi";

// Define the User type
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
};

// Define the Post type
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// Extend User to include postCount
type UserWithPostCount = User & {
  postCount: number;
};

// Fetch users and their post counts
const fetchUsersWithPosts = async (): Promise<UserWithPostCount[]> => {
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  if (!usersRes.ok || !postsRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const users: User[] = await usersRes.json();
  const posts: Post[] = await postsRes.json();

  return users.map((user) => ({
    ...user,
    postCount: posts.filter((post) => post.userId === user.id).length,
  }));
};

export default function ManageComments() {
  const queryClient = useQueryClient();

  // Main user list query
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<UserWithPostCount[], Error>({
    queryKey: ["users-with-posts"],
    queryFn: fetchUsersWithPosts,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  // Prefetch user data on hover
  const prefetchUser = (userId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: () => fetchUsersWithPosts(),
      staleTime: 60 * 1000,
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
          <button
            onClick={() => queryClient.refetchQueries({ queryKey: ["users-with-posts"] })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Comments</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/manage-comments/${user.id}`}
              className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1"
              onMouseEnter={() => prefetchUser(user.id)}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  <FiUser className="text-xl" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 flex items-center">
                  <FiMail className="mr-2" />
                  {user.email}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FiMapPin className="mr-2" />
                  {user.address.city}
                </p>
                <div className="flex items-center mt-3 text-blue-600">
                  <FiFileText className="mr-2" />
                  <span className="font-medium">
                    {user.postCount > 0
                      ? `${user.postCount} ${user.postCount === 1 ? "Post" : "Posts"}`
                      : "No Posts"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}