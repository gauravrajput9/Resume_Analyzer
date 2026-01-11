"use client";
import React, { useState, useTransition } from "react";
import { getAIResponse } from "../lib/getAIResponse";

const DisplayAiResponse = () => {
  const [aiRes, setAiRes] = useState("");
  const [isPending, startTransition] = useTransition();

  const ai = () => {
    startTransition(async () => {
      const res = await getAIResponse();
      setAiRes(res);
    });
  };

  return (
    <>
      <button onClick={ai}>
        {isPending ? "Thinking..." : "Get AI Response"}
      </button>

      <section>{aiRes}</section>
    </>
  );
};

export default DisplayAiResponse;
