import { NextResponse } from "next/server";
import Resume from "../../../../../models/resume.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const userId = session.user.id;

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: 1 }); // ⬅️ ASCENDING order

    if (resumes.length === 0) {
      return NextResponse.json(
        { success: false, message: "No resumes found" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        userId: session?.user?.id,
        resumes,
        message: "Resumes fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Resumes Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching resumes" },
      { status: 500 }
    );
  }
}
