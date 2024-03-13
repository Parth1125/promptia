"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);
  console.log(Posts);
  const handleEdit = () => {};
  const handleDelete = async () => {};
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
