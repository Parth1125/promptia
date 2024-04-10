"use client";
import { Suspense, useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import Form from "@components/Form";
import Loading from "@app/Loading";

const EditPrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const id = params?.get("id");

  const [promptId, setPromptId] = useState(null);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    if (id) {
      setPromptId(id);
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${id}`);
        const data = await response.json();
        setpost({ prompt: data.prompt, tag: data.tag });
      };
      getPromptDetails();
    }
  }, []);
  // debugger;

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
    <Suspense>
      <Form
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
