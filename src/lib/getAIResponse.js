"use server";

import { callAI } from "@/lib/ai";

export async function getAIResponse() {
  return await callAI("Explain Java OOP");
}
