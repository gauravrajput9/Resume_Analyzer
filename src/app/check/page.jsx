import MyResumesClient from "@/components/resume/MyResumes";
import { Suspense } from "react";
import UserProfileHeader from "@/components/user/userHeader";
import ResumeLoadingSkeleton from "@/components/resume/resumeLoadingSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Resume from "../../../models/resume.model";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import BackButton from "../back-button";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  console.log(session.user.id)
  let resumes = [];

  try {
    await connectDB();

    resumes = await Resume.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    resumes = resumes.map((resume) => ({
      ...resume,
      _id: resume._id.toString(),
      userId: resume.userId.toString(),
      createdAt: resume.createdAt.toISOString(),
      expiresAt: new Date(
        new Date(resume.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
  } catch (error) {
    console.error("My Resumes page error:", error);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <UserProfileHeader user={session.user} />

        <div className="mt-12 mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
            My Resume Analyses
          </h1>
          <p className="text-gray-400 mt-2">
            Track and manage your resume analysis results
          </p>
        </div>

        <Suspense fallback={<ResumeLoadingSkeleton />}>
          <MyResumesClient resumes={resumes} />
        </Suspense>

        <div className="flex mt-8 items-center gap-4">
          {/* Back Button */}
          <BackButton/>

          {/* Home Button */}
          <Link href="/">
            <Button
              variant="default"
              className="flex items-center gap-2 bg-white text-black hover:bg-gray-200"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
