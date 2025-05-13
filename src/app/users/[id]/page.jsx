"use client";

import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import 'mapbox-gl/dist/mapbox-gl.css';
import UserMap from "./usersMap";



const UserProfile = ({ params }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parallel fetching for better performance
        const [userResponse, postsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        ]);

        if (!userResponse.ok || !postsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [userData, postsData] = await Promise.all([
          userResponse.json(),
          postsResponse.json()
        ]);

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const fetchComments = async (postId) => {
    if (comments[postId]) return;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const togglePost = (postId) => {
    setExpandedPostId(prev => prev === postId ? null : postId);
    if (expandedPostId !== postId) fetchComments(postId);
  };

  if (loading) return <div className="p-6 text-center">Loading user data...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!user) return <div className="p-6">User not found</div>;

  // Safely parse coordinates
  const lat = parseFloat(user?.address?.geo?.lat);
  const lng = parseFloat(user?.address?.geo?.lng);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Profile */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 mb-1">@{user.username}</p>
        <p className="text-gray-800 mb-4">{user.email}</p>
        
        <div className="mt-4 h-64 rounded-lg overflow-hidden shadow-md">
          {!isNaN(lat) && !isNaN(lng) ? (
            <UserMap latitude={lat} longitude={lng} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p>No valid location data available</p>
            </div>
          )}
        </div>
      </div>

      {/* User's Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts ({posts.length})</h2>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <button
                    onClick={() => togglePost(post.id)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    aria-label={expandedPostId === post.id ? "Collapse post" : "Expand post"}
                  >
                    {expandedPostId === post.id ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
                
                {expandedPostId === post.id && (
                  <div className="mt-4 animate-fadeIn">
                    <p className="text-gray-700 mb-4">{post.body}</p>
                    
                    <div className="border-t pt-3">
                      <h4 className="text-md font-semibold mb-2">Comments ({comments[post.id]?.length || 0})</h4>
                      {comments[post.id] ? (
                        <ul className="space-y-3">
                          {comments[post.id].map((comment) => (
                            <li key={comment.id} className="border rounded p-3 bg-gray-50">
                              <p className="font-medium text-gray-800">{comment.name}</p>
                              <p className="text-gray-600 mt-1">{comment.body}</p>
                              <p className="text-sm text-gray-500 mt-2">By: {comment.email}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">Loading comments...</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;