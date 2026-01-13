"use client";
import React, { useState, useEffect } from "react";
import {
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Zap,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SampleReportPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reportSections = [
    {
      id: 1,
      title: "Overall Resume Score",
      image: "/scoreCard.png",
      icon: Award,
      color: "from-green-500 to-emerald-600",
      description: "Your resume gets a comprehensive score out of 100",
    },
    {
      id: 2,
      title: "Score Breakdown",
      image: "/score.png",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-600",
      description: "Detailed metrics across ATS, Skills, and Content",
    },
    {
      id: 3,
      title: "Skills Analysis",
      image: "/skills.png",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-600",
      description: "See matched skills and what's missing from your resume",
    },
    {
      id: 4,
      title: "Strengths & Weaknesses",
      image: "/strengths.png",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      description: "Identify what's working and what needs improvement",
    },
    {
      id: 5,
      title: "ATS Analysis",
      image: "/ATS.png",
      icon: FileText,
      color: "from-pink-500 to-rose-600",
      description: "Ensure your resume passes automated screening systems",
    },
    {
      id: 6,
      title: "Grammar & Formatting",
      image: "/rename.png",
      icon: AlertCircle,
      color: "from-indigo-500 to-blue-600",
      description: "Catch formatting and grammar issues",
    },
    {
      id: 7,
      title: "Improvement Suggestions",
      image: "/improvements.png",
      icon: TrendingUp,
      color: "from-teal-500 to-green-600",
      description: "Prioritized action items to improve your resume",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % reportSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reportSections.length]);

  const handleSectionClick = (index) => {
    setActiveSection(index);
    setIsAutoPlaying(false);
  };

  const Icon = reportSections[activeSection].icon;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Left: Analyze Resume */}
        <Link href="/resume-analyzer">
          <Button className="text-lg font-bold px-5 py-2 hover:bg-blue-700 transition-colors">
            Analyze Resume
          </Button>
        </Link>

        {/* Right: Home */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sample Report
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Explore what your comprehensive resume analysis looks like
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-3">
            <div className="sticky top-6">
              {reportSections.map((section, index) => {
                const SectionIcon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                      activeSection === index
                        ? `bg-linear-to-r ${section.color} shadow-lg scale-105`
                        : "bg-gray-800/50 hover:bg-gray-700/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeSection === index
                            ? "bg-white/20"
                            : "bg-gray-700 group-hover:bg-gray-600"
                        }`}
                      >
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{section.title}</div>
                        <div
                          className={`text-sm ${
                            activeSection === index
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        >
                          Section {section.id}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Display */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section Info Card */}
            <div
              className={`bg-linear-to-r ${reportSections[activeSection].color} rounded-2xl p-6 shadow-2xl animate-slideIn`}
            >
              <div className="flex items-start p-3 gap-4">
                <div className="p-3 mt-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    {reportSections[activeSection].title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {reportSections[activeSection].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot Display */}
            <div className="relative group">
              <div
                className={`absolute -inset-1 bg-linear-to-r ${reportSections[activeSection].color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
              ></div>
              <div className="relative bg-gray-900 rounded-2xl p-3 border border-gray-700">
                <img
                  key={activeSection}
                  src={reportSections[activeSection].image}
                  alt={reportSections[activeSection].title}
                  className="w-full rounded-xl animate-fadeIn"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  Section {activeSection + 1} of {reportSections.length}
                </span>
                <span>
                  {Math.round(
                    ((activeSection + 1) / reportSections.length) * 100
                  )}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-linear-to-r ${reportSections[activeSection].color} h-2 rounded-full transition-all duration-500`}
                  style={{
                    width: `${((activeSection + 1) / reportSections.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  handleSectionClick(Math.max(0, activeSection - 1))
                }
                disabled={activeSection === 0}
                className="p-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300"
              >
                Previous
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300"
              >
                {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
              </button>

              <button
                onClick={() =>
                  handleSectionClick(
                    Math.min(reportSections.length - 1, activeSection + 1)
                  )
                }
                disabled={activeSection === reportSections.length - 1}
                className="p-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* route navigations */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Analyze Resume Button */}
        <Link href="/resume-analyzer">
          <Button className="text-xl font-bold px-5 py-2 hover:bg-blue-700 transition-colors">
            Analyze Resume
          </Button>
        </Link>

        {/* Home Button with Icon */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
