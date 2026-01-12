import { NextResponse } from "next/server";
import { callAI } from "@/lib/ai";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    // Limit text length to prevent timeouts (roughly 8000 characters)
    const truncatedText = text.length > 8000 ? text.substring(0, 8000) + "... (truncated)" : text;

    const prompt = `
Analyze the following resume and give simple feedback:

- Strengths
- Weaknesses
- Improvement suggestions

Resume:
${truncatedText}
`;

    const result = await callAI(prompt);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
