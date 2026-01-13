"use client";

import ResumeUpload from "@/components/resume/FileUpload";
import AnalysisOptions from "@/components/resume/AnalysisOptions";
import AnalyzeButton from "@/components/resume/AnalyzeButton";
import AnalysisProgress from "@/components/resume/AnalysisProgress";
import { useState } from "react";
import JobDescriptionInput from "@/components/resume/JobDescription";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function ResumeAnalyzerPage() {
  const router = useRouter()
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [analysisOptions, setAnalysisOptions] = useState({
    atsScore: true,
    skillGapAnalysis: true,
    grammarAndFormatting: true,
    jobDescriptionMatch: true,
  });

  const [jobDescription, setJobdescription] = useState("");
  const [openJD, setOpenJD] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    // setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Failed to upload file");
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log(result.text)

      // send the data to the ai for resume Analysis
      if (!result.text) {
        setError("Failed to extract text from PDF");
        setLoading(false);
        return;
      }

      const analyzeRes = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: result.text, options: analysisOptions, description: jobDescription }),
      });

      if (!analyzeRes.ok) {
        const err = await analyzeRes.json();
        setError(err.error || "Failed to analyze resume");
        setLoading(false);
        return;
      }

      const analyzeData = await analyzeRes.json();
      console.log(analyzeData.result)
      router.push(`/resume-analyzer/results?id=${analyzeData.resultId}`)
      
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
        {file && (
          <AnalysisOptions
            analysisOptions={analysisOptions}
            setAnalysisOptions={setAnalysisOptions}
          />
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={openJD}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setOpenJD(isChecked);

                // Optional but recommended: clear JD when unchecked
                if (!isChecked) {
                  setJobdescription("");
                }
              }}
            />
            <p className="text-sm text-gray-300">
              Do you want to provide a Job Description you are applying for?
            </p>
          </div>

          {file && openJD && (
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobdescription}
            />
          )}
        </div>

        {/* Analyze Button + Progress */}
        <div className="flex flex-col items-center gap-4">
          <AnalyzeButton
            disabled={!file}
            isLoading={loading}
            onClick={handleAnalyze}
          />
          {loading && <AnalysisProgress />}
          {error && (
            <div className="w-full max-w-2xl p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
