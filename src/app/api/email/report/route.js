import { NextResponse } from "next/server";
import { sendReportEmail } from "@/lib/Email";

export async function POST(req) {
  const { report, email } = await req.json();

  if (!report || !email) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await sendReportEmail({ report, email });

  return NextResponse.json({ success: true });
}
