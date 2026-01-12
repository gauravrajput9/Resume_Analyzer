"use client";

import ResumeUpload from "@/components/resume/FileUpload";
import AnalysisOptions from "@/components/resume/AnalysisOptions";
import AnalyzeButton from "@/components/resume/AnalyzeButton";
import AnalysisProgress from "@/components/resume/AnalysisProgress";
import AnalysisResult from "@/components/resume/AnalysisResult";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockResumeAnalysis } from "@/lib/mockAnalysis";

export default function ResumeAnalyzerPage() {
  const router = useRouter();
  const [result, setResult] = useState(null)
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(file)

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 3000));
    setResult(mockResumeAnalysis);
    setLoading(false);
    router.push("/resume-analyzer/results");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 transition-colors">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Resume Analyzer</h1>
          <p className="text-gray-400">
            Upload your resume and get AI-powered insights
          </p>
        </div>

        {/* Resume Upload */}
        <ResumeUpload file={file} setFile={setFile} />

        {/* Analysis Options */}
        {file && <AnalysisOptions />}

        {/* Analyze Button + Progress */}
        <div className="flex flex-col items-center gap-4">
          <AnalyzeButton
            disabled={!file}
            isLoading={loading}
            onClick={handleAnalyze}
          />
          {loading && <AnalysisProgress />}
        </div>

      </div>
    </div>
  );
}
