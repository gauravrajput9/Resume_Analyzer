"use client";
import React from "react";
import { Button } from "./Button";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const Navigation = () => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with Glow */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Resume Analyzer
          </span>
        </div>

        {/* Desktop Links with Hover Effects */}
        <div className="hidden md:flex gap-8 text-sm">
          {["Features", "ATS Score", "Pricing"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(" ", "_")}`}
              className="relative text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Button
                variant="nav-ghost"
                size="sm"
                onClick={() =>
                  signOut({
                     callbackUrl: window.location.origin,
                  })
                }
              >
                Logout
              </Button>

              <Link href="/resume-analyzer">
                <Button variant="nav-gradient" size="sm">
                  Analyze Resume
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="nav-ghost" size="sm">
                  Sign In
                </Button>
              </Link>

              <Link href="/signup">
                <Button variant="nav-gradient" size="sm">
                  Sign Up
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu with Slide Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 bg-linear-to-b from-black/95 to-black/80 backdrop-blur-xl border-t border-white/5">
          {["Features", "ATS Score", "Pricing"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "_")}`}
              className="text-white/70 hover:text-white transition-all duration-300 py-2 hover:translate-x-2"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-3 w-full max-w-xs">
            {session ? (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: "/",
                    })
                  }
                >
                  Logout
                </Button>

                <Link href="/resume-analyzer" className="w-full">
                  <Button className="w-full justify-center">
                    Analyze Resume
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full">
                  <Button className="w-full justify-center">Sign In</Button>
                </Link>

                <Link href="/signup" className="w-full">
                  <Button variant="secondary" className="w-full justify-center">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
