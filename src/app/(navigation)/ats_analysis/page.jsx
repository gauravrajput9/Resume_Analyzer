'use client'
import { Button } from "@/components/hero/Button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ATSInfoPage = () => {
  const {data: session} = useSession()
  console.log(session)
  return (
    <section className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-linear-to-r from-purple-600 to-blue-500 text-xs text-white/90 mb-4">
            AI-powered insights
            <ArrowRight size={14} />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            All About ATS Scores
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Learn how AI evaluates your resume, what factors influence your ATS
            score, and actionable tips to improve it.
          </p>
        </div>

        {/* Sections */}
        {[
          {
            title: "What is an ATS Score?",
            content:
              "ATS stands for Applicant Tracking System, a software used by recruiters to automatically screen resumes. An ATS score measures how well your resume matches a specific job description based on keywords, formatting, and relevant experience.",
          },
          {
            title: "How AI Checks Your Resume",
            content:
              "Our AI analyzes your resume against job descriptions to simulate ATS behavior. It scans:",
            list: [
              "Keywords relevant to the job role",
              "Skills and certifications mentioned",
              "Formatting and structure of the resume",
              "Consistency and clarity of work experience",
            ],
          },
          {
            title: "Aspects Considered for ATS Score",
            content:
              "AI evaluates multiple aspects to calculate your ATS score:",
            list: [
              "Keyword matching with the job description",
              "Proper headings and sections (Education, Experience, Skills)",
              "Use of standard fonts and formatting",
              "Length of resume and readability",
              "Relevance of skills and experience",
            ],
          },
          {
            title: "Factors That Can Affect Your Score",
            list: [
              "Missing relevant keywords",
              "Non-standard headings or complex formatting",
              "Using images or tables that ATS can't read",
              "Inconsistent job titles or dates",
              "Spelling mistakes and unclear phrasing",
            ],
          },
          {
            title: "How to Increase Your ATS Score",
            list: [
              "Use clear, standard headings: Experience, Skills, Education",
              "Include keywords from the job description naturally",
              "Keep formatting simple: avoid tables, images, and fancy fonts",
              "Highlight relevant skills and accomplishments",
              "Proofread for spelling and grammar errors",
              "Tailor each resume for the specific job you are applying for",
            ],
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="bg-white/5 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              {section.title}
            </h2>
            {section.content && (
              <p className="text-white/70 mb-4">{section.content}</p>
            )}
            {section.list && (
              <ul className="list-disc list-inside text-white/70 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i} className="hover:text-white transition">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Closing Note */}
        <div className="text-center text-white/60 text-lg">
          Using AI-powered ATS analysis ensures your resume passes screening and
          increases your chances of getting noticed.
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button asChild variant="gradient" size="lg">
            <Link className="inline-flex items-center gap-2" href="/">
              <ChevronLeft size={20} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ATSInfoPage;
