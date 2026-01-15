export const runtime = "nodejs"; // Important: pdf-parse works only in Node

import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const text = await extractTextFromPDF(buffer);

    return NextResponse.json({ text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to extract text" }, { status: 500 });
  }
}
