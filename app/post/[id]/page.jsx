"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const Post = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("_id");

  const [userPost, setUserPost] = useState();

  console.log(userPost);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/${params?.id}`);
      const data = await response.json();

      setUserPost(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <div className="post-details">
      <h1 className="text-2xl font-bold mb-4">Post Details</h1>
      {userPost ? (
        <div className="post-card bg-white rounded shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">{userPost.prompt}</h2>
          <p className="text-gray-500 mb-2">{userPost.tag}</p>
          {userPost.image && (
            <img src={userPost.image} alt="Post Image" className="w-full mb-4 rounded-lg" />
          )}
          <p className="text-gray-700">
            Creator: {userPost.creator.username} ({userPost.creator.email})
          </p>
          {/* Add any other relevant post details here */}
          <p className="text-gray-700">Likes: {userPost.likes}</p>
          <p className="text-gray-700">Comments: {userPost.comments}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default Post;
