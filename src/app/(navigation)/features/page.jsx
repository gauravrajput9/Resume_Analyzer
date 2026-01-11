import { Button } from "@/components/hero/Button";
import { ChevronLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI Resume Analysis",
    description:
      "Our AI scans your resume for keywords, formatting, and structure to give a precise ATS score.",
  },
  {
    title: "ATS Score Simulation",
    description:
      "Simulate how real Applicant Tracking Systems evaluate your resume for job applications.",
  },
  {
    title: "Resume Optimization Tips",
    description:
      "Receive actionable suggestions to improve formatting, clarity, and keyword relevance.",
  },
  {
    title: "Keyword & Skill Matching",
    description:
      "Identify missing keywords and skills compared to your desired job description.",
  },
  {
    title: "Multi-format Support",
    description:
      "Supports PDF, DOCX, and plain text resume formats for analysis.",
  },
  {
    title: "Email Reports",
    description:
      "Get detailed ATS reports and suggestions delivered directly to your email.",
  },
];

const FeaturesPage = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-linear-to-r from-purple-600 to-blue-500 text-xs text-white/90 mb-4">
            AI-Powered Features
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            Explore Our Features
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto leading-relaxed">
            Discover the powerful features our AI resume analyzer provides to help
            you optimize your resume and increase your chances of landing your dream job.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition duration-300 flex items-start gap-4"
            >
              <CheckCircle className="w-8 h-8 text-purple-500 shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h2>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
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

export default FeaturesPage;
