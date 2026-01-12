"use client";
import React from "react";
import { Button } from "./Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span className="text-lg font-semibold text-white">Resume Analyzer</span>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          <Link href="/features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="/ats_analysis" className="hover:text-white transition">
            ATS Score
          </Link>
          <Link href="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm font-medium transition"
              >
                Logout
              </button>
              <Link href="/resume-analyzer">
                <Button size="sm">Analyze Resume</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-black">
          <Link href="/features" className="text-white/70 hover:text-white transition">
            Features
          </Link>
          <Link href="#" className="text-white/70 hover:text-white transition">
            ATS Score
          </Link>
          <Link href="#" className="text-white/70 hover:text-white transition">
            Pricing
          </Link>
          <div className="flex flex-col gap-2 mt-2">
            {session ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm font-medium transition"
                >
                  Logout
                </button>
                <Link href="/resume">
                  <Button size="sm" className="w-full">
                    Analyze Resume
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
