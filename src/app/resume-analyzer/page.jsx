"use client";

import ResumeUpload from "@/components/resume/FileUpload";
import AnalysisOptions from "@/components/resume/AnalysisOptions";
import AnalyzeButton from "@/components/resume/AnalyzeButton";
import AnalysisProgress from "@/components/resume/AnalysisProgress";
import JobDescriptionInput from "@/components/resume/JobDescription";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import BackButton from "../back-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeAnalyzerPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [analysisOptions, setAnalysisOptions] = useState({
    atsScore: true,
    skillGapAnalysis: true,
    grammarAndFormatting: true,
    jobDescriptionMatch: true,
  });

  const [jobDescription, setJobdescription] = useState("");
  const [openJD, setOpenJD] = useState(false);

  // after resume upload states
  const [existingResultId, setExistingResultID] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [showDecision, setShowDecision] = useState(false);

  // FIRST CLICK → upload + check if resume exists
  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

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
      if (!result.text) {
        setError("Failed to extract text from PDF");
        setLoading(false);
        return;
      }

      setResumeText(result.text);

      // Check if resume already analyzed
      const analyzeRes = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: result.text,
          options: analysisOptions,
          description: jobDescription,
          reAnalyze: false,
        }),
      });

      if (!analyzeRes.ok) {
        const err = await analyzeRes.json();
        setError(err.error || "Failed to analyze resume");
        setLoading(false);
        return;
      }

      const analyzeData = await analyzeRes.json();

      if (analyzeData.reused) {
        setExistingResultID(analyzeData.resultId);
        setShowDecision(true);

        toast.info(
          "This Resume Has Already Been Analyzed. Do you want to re-use the previous one or re-analyze it? Select from the options below."
        );

        setLoading(false);
        return; // stop here, wait for user action
      }

      router.push(`/resume-analyzer/results?id=${analyzeData.resultId}`);
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Re-analyze with AI
  const handleReAnalyze = async () => {
    if (!resumeText) return;
    setLoading(true);

    try {
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: resumeText,
          options: analysisOptions,
          jobDescription,
          reAnalyze: true,
        }),
      });

      const data = await res.json();
      router.push(`/resume-analyzer/results?id=${data.resultId}`);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to re-analyze resume");
    } finally {
      setLoading(false);
    }
  };

  // Reuse existing analysis
  const handleReuse = () => {
    if (!existingResultId) return;
    router.push(`/resume-analyzer/results?id=${existingResultId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 transition-colors">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Top Navigation */}
        <div className="relative">
          <div className="absolute top-0 left-0">
            <BackButton />
          </div>
          <div className="absolute top-0 right-0">
            <Link href="/">
              <Button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200">
                <Home className="h-4 w-4" /> Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Resume Analyzer</h1>
          <p className="text-gray-400">
            Upload your resume and get AI-powered insights
          </p>
        </div>

        {/* Upload & Options */}
        <ResumeUpload file={file} setFile={setFile} />
        {file && (
          <AnalysisOptions
            analysisOptions={analysisOptions}
            setAnalysisOptions={setAnalysisOptions}
          />
        )}

        {/* Job Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={openJD}
              onCheckedChange={(checked) => {
                setOpenJD(checked === true);
                if (!checked) setJobdescription("");
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

        {/* Decision Buttons (above Analyze button) */}
        {showDecision && (
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Button
              variant="nav-ghost"
              onClick={handleReuse}
            >
              Reuse Existing Result
            </Button>
            <Button
              variant="nav-ghost"
              onClick={handleReAnalyze}
              
            >
              Re-analyze Resume
            </Button>
          </div>
        )}

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
