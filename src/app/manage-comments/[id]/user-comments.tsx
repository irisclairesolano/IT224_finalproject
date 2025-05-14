"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiFileText, FiUser } from "react-icons/fi";


type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UserComments = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user and posts in parallel
        const [userResponse, postsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${params.id}`),
        ]);

        if (!userResponse.ok || !postsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData = await userResponse.json();
        const postsData = await postsResponse.json();

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // Skip fetching if comments are already loaded

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const togglePost = (postId: number) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      setExpandedPosts((prev) => [...prev, postId]);
      fetchComments(postId); // Fetch comments when expanding
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!user || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <p>No posts found for this user.</p>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">
                  <FiUser />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg flex items-center">
                <FiFileText className="mr-2" />
                <span className="font-semibold">
                  {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{post.title}</h3>
                  <button
                    onClick={() => togglePost(post.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {expandedPosts.includes(post.id) ? (
                      <>
                        <FiChevronUp className="mr-1" /> Hide Comments
                      </>
                    ) : (
                      <>
                        <FiChevronDown className="mr-1" /> Show Comments
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{post.body}</p>

                {expandedPosts.includes(post.id) && (
                  <div className="mt-4 space-y-4">
                    {comments[post.id] ? (
                      comments[post.id].map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">{comment.name}</h4>
                          <p className="text-gray-700">{comment.body}</p>
                          <p className="text-sm text-gray-500">By: {comment.email}</p>
                        </div>
                      ))
                    ) : (
                      <p>Loading comments...</p>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserComments;