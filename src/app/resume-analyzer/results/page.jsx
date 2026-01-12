"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AnalysisTabs from "../../../components/resume/AnalysisTabs";
import ResumeScore from "../../../components/resume/ScoreCard";
import { mockResumeAnalysis } from "../../../lib/mockAnalysis";

export default function ResumeResultPage() {
  const analysis = mockResumeAnalysis;

  return (
    <div className="dark">
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-foreground px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* ================= HEADER ================= */}
          <section className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Resume Analysis Report
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
                AI-powered evaluation of your resume with ATS insights, skill
                gaps, and improvement suggestions.
              </p>
            </div>

            <div className="flex gap-3">
              <Badge className="bg-emerald-500/10 text-emerald-400">
                ATS: {analysis.ats.status}
              </Badge>
              <Badge variant="outline" className="border-zinc-700">
                Score {analysis.score}/100
              </Badge>
            </div>
          </section>

          {/* ================= METRICS ================= */}
          <section className="mb-16">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Score */}
              <div className="h-full">
                <ResumeScore score={analysis.score} />
              </div>

              {/* Matched */}
              <Card className="h-full border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
                <CardContent className="p-8 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Matched Skills
                  </p>
                  <p className="text-4xl font-bold text-emerald-400">
                    {analysis.skills.matched.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Skills aligned with job role
                  </p>
                </CardContent>
              </Card>

              {/* Missing */}
              <Card className="h-full border-zinc-800 bg-zinc-900/70 backdrop-blur-sm">
                <CardContent className="p-8 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Missing Skills
                  </p>
                  <p className="text-4xl font-bold text-destructive">
                    {analysis.skills.missing.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recommended to improve match
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ================= ANALYSIS ================= */}
          <section className="mb-16">
            <Card className="border-zinc-800 bg-zinc-900/75 backdrop-blur-sm">
              <CardContent className="p-10">
                <AnalysisTabs analysis={analysis} />
              </CardContent>
            </Card>
          </section>

          {/* ================= ACTIONS ================= */}
          <section className="mt-10 mr-3 flex flex-wrap items-center justify-end gap-6 border-t border-zinc-800 pt-8">
            <button className="text-sm text-zinc-400 transition hover:text-zinc-100 hover:underline">
              Analyze another resume
            </button>

            <button
              className="ml-5 px-5 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:scale-[1.04] hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-primary
    focus:ring-offset-2 active:scale-95"
            >
              Download Report
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
