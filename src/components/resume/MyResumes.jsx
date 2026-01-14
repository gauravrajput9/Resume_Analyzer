"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Clock, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default function MyResumesClient({ resumes }) {
  const calculateDaysUntilDeletion = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const daysLeft = Math.ceil((expires - now) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-blue-500 to-cyan-500";
    if (score >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80)
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (score >= 60) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (score >= 40)
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  if (!resumes || resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
          <FileText className="w-24 h-24 text-gray-600 relative" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-400 mt-6">
          No resumes analyzed yet
        </h3>
        <p className="text-gray-500 mt-2">
          Upload your first resume to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume, index) => {
        const daysLeft = calculateDaysUntilDeletion(resume.expiresAt);
        const overallScore = resume.result?.overallScore || 0;

        return (
          <Link
            href={`/resume-analyzer/results?id=${resume._id}`}
            key={resume._id}
          >
            <Card
              className="group bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 h-full"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex  items-center gap-3">
                    <div
                      className={`w-12 h-12 m-3 rounded-xl bg-linear-to-br ${getScoreColor(overallScore)} flex items-center justify-center shadow-lg`}
                    >
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        Resume Analysis
                      </h3>
                    </div>
                  </div>
                  <Badge
                    className={`${getScoreBadgeColor(overallScore)} font-bold mt-3 mr-3 px-3 py-1`}
                  >
                    {overallScore}
                  </Badge>
                </div>

                {/* Score Breakdown */}
                <div className="mx-3 grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                    <div className="text-xs text-gray-400 mb-1">ATS</div>
                    <div className="text-lg font-bold text-white">
                      {resume.result?.scoreBreakdown?.ats || 0}
                    </div>
                  </div>
                  <div className="text-center bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                    <div className="text-xs text-gray-400 mb-1">Skills</div>
                    <div className="text-lg font-bold text-white">
                      {resume.result?.scoreBreakdown?.skills || 0}
                    </div>
                  </div>
                  <div className="text-center bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                    <div className="text-xs text-gray-400 mb-1">Content</div>
                    <div className="text-lg font-bold text-white">
                      {resume.result?.scoreBreakdown?.content || 0}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-700/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Created:{" "}
                      {new Date(resume.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 text-xs ${daysLeft <= 2 ? "text-red-400" : "text-gray-400"}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>
                      Expires:{" "}
                      {new Date(resume.expiresAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {daysLeft > 0
                        ? ` (${daysLeft} day${daysLeft > 1 ? "s" : ""} left)`
                        : " (Expired)"}
                    </span>
                  </div>

                  <button className="w-full my-4 bg-linear-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 text-blue-400 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
