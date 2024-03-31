"use client";
import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import Loading from "@app/Loading";

const EditPrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const router = useRouter();
  //   const { data: session } = useSession();
  // const promptId = router.query.id; // Accessing the 'id' query parameter using useRouter
  const [promptId, setPromptId] = useState(null);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    // Check if the router is ready and if the id is present in the query
    if (router.isReady) {
      const queryId = router.query.id;
      if (queryId) {
        setPromptId(queryId);
        const getPromptDetails = async () => {
          const response = await fetch(`/api/prompt/${queryId}`);
          const data = await response.json();
          setPost({ prompt: data.prompt, tag: data.tag });
        };
        getPromptDetails();
      }
    }
  }, [router.isReady, router.query]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
