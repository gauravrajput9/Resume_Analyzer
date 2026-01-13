import { connectDB } from "@/lib/mongodb";
import Resume from "../../../../models/resume.model";
import AnalysisResult from "@/components/resume/AnalysisResult";

export const dynamic = "force-dynamic";

const ResumeAnalysisResult = async ({ searchParams }) => {
  const { id } = await searchParams;
  await connectDB();

  const data = await Resume.findById(id).lean();

  if (!data) {
    return <p className="text-center mt-10">Result not found</p>;
  }

  return (
    <>
      <AnalysisResult data={data.result} />
    </>
  );
};

export default ResumeAnalysisResult;
