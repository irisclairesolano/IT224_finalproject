// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// const UserPosts = () => {
//   const { userId } = useParams();
//   const [posts, setPosts] = useState([]);

//   // Fetch posts for the specific user
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(
//           `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
//         );
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Posts by User {userId}</h1>
//       <div className="space-y-4">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             <h2 className="text-lg font-semibold">{post.title}</h2>
//             <p className="text-sm text-gray-500">{post.body}</p>
//             <p className="text-sm text-gray-400">
//               Posted on: {new Date().toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserPosts;