import { connectDB } from "@/lib/mongodb";
import Resume from "../../../../models/resume.model";
import AnalysisResult from "@/components/resume/AnalysisResult";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const ResumeAnalysisResult = async ({ searchParams }) => {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  await connectDB();

  const data = await Resume.findById(id).lean();
  console.log(data)

  if (!data) {
    notFound();
  }

  return (
    <>
      <AnalysisResult data={data.result} />
    </>
  );
};

export default ResumeAnalysisResult;
