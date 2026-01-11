import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import Image from "next/image";

export const Hero = async () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 bg-black text-white">
      <span className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
        AI-powered resume insights
        <ArrowRight size={14} />
      </span>

      <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
        Optimize your resume <br /> for every job role
      </h1>

      <p className="mt-6 max-w-xl text-white/60">
        Upload your resume and get instant ATS score, skill gaps, and AI-driven
        improvement suggestions.
      </p>

      <div className="mt-10 flex gap-4">
        <Button variant="gradient" size="lg">
          Analyze Resume
        </Button>
        <Button variant="ghost" size="lg">
          View Sample Report
        </Button>
      </div>

      {/* Decorative Image */}
      <div className="mt-20 max-w-4xl w-full">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          alt="Resume analysis dashboard"
          width={1200}
          height={700}
          className="rounded-xl opacity-80 w-full h-auto max-h-100 object-cover"
          priority
          unoptimized
        />
      </div>
    </section>
  );
};
