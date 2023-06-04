"use client";

import CommentFeild from "@components/CommentFeild";
import { useEffect, useState } from "react";

const Post = ({ params }) => {

  const [userPost, setUserPost] = useState();
  const [comment, setComment] = useState();

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
      {userPost ? (
        <div className="post-card bg-white  rounded shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">{userPost.prompt}</h2>
          <p className="text-gray-500 mb-2">{userPost.tag}</p>
          {userPost.image && (
            <img src={userPost.image} alt="Post Image" className="w-full mb-4 rounded-lg" />
          )}
          <p className="text-gray-700">
            Creator: {userPost.creator.username} ({userPost.creator.email})
          </p>
          <p className="text-gray-700">Likes: {userPost.likes}</p>
          <p className="text-gray-700">Comments: {userPost.comments}</p>

          <CommentFeild comment={comment} setComment={setComment}  />

          </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default Post;
