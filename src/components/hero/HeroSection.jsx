"use client";
import { ArrowRight, Sparkles, Zap, Target, Shield } from "lucide-react";
import { Button } from "./Button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const Hero = () => {
  const { data: session } = useSession();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-black text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 animate-fadeIn">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-sm text-white/90 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
          <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
          AI-powered resume insights
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          <span className="bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient">
            Optimize your resume
          </span>
          <br />
          <span
            className="bg-linear-to-r from-pink-200 via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient"
            style={{ animationDelay: "0.5s" }}
          >
            for every job role
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
          Upload your resume and get instant ATS score, skill gaps, and
          AI-driven improvement suggestions tailored to your dream job.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/resume-analyzer">
            <Button variant="gradient" size="default" className="group">
              Analyze Resume
              <Zap className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
          <Link href="/sample-report">
            <Button variant="gradient" size="default">
              View Sample Report
            </Button>
          </Link>
          {session && (
            <>
              <Link href="/check">
                <Button variant="gradient" size="default">
                  View My Resumes
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
          {[
            { icon: Target, text: "95% ATS Match" },
            { icon: Zap, text: "Instant Analysis" },
            { icon: Shield, text: "Secure & Private" },
          ].map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Icon className="w-4 h-4 text-purple-400" />
              {text}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};
