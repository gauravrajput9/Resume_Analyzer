"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { signUp } from "@/actions/auth.actions";
import { Loader, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGitHubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handelGoogleSignup = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
    setGoogleLoading(false);
  };
  const handleGitHubLogin = async () => {
    setGitHubLoading(true);
    await signIn("github", {
      callbackUrl: "/",
    });
    setGitHubLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    const res = await signUp(name, email, password);
    router.push("/login");
    setLoading(false);
    if (res.success == true) {
      toast.success(res.message);
      setName("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="w-full max-w-5xl h-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex overflow-hidden shadow-2xl relative z-10">
        {/* Left: Form */}
        <div className="relative w-full lg:w-1/2 px-8 py-16">
          {/* Navigation Text */}
          <div className="absolute top-4 right-8 text-sm text-white/70">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-white underline hover:text-purple-400 transition-colors"
            >
              Sign In
            </a>
          </div>

          <form
            className="relative z-10 flex flex-col gap-5 text-center animate-fadeIn"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Get Started
              </h1>
              <p className="text-sm text-white/60">Create your account and unlock your potential</p>
            </div>

            {/* Name */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 placeholder:text-white/40"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 placeholder:text-white/40"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 placeholder:text-white/40"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 placeholder:text-white/40"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-2 relative group overflow-hidden rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handelGoogleSignup()}
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded-lg px-4 py-3 text-sm text-white bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group"
              >
                {googleLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.3 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8.1 6.3C12.5 13.1 17.8 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.1 24.5c0-1.7-.15-3.3-.43-4.9H24v9.3h12.5c-.54 2.9-2.2 5.4-4.7 7.1l7.2 5.6c4.2-3.9 6.6-9.6 6.6-17.1z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.7 28.2c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-8.1-6.3C.9 15.9 0 19.8 0 23.5c0 3.7.9 7.6 2.6 11l8.1-6.3z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 47c6.4 0 11.8-2.1 15.7-5.8l-7.2-5.6c-2 1.3-4.6 2.1-8.5 2.1-6.2 0-11.5-3.6-13.3-8.8l-8.1 6.3C6.5 42.6 14.6 47 24 47z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Google</span>
                  </>
                )}
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleGitHubLogin()}
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded-lg px-4 py-3 text-sm text-white bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group"
              >
                {githubLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 .5C5.65.5.5 5.85.5 12.4c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.6-1.4-2-1.4-2-1.2-.9.1-.9.1-.9 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.8-1.8-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.6 1.3 1-.3 2-.4 3.1-.4s2.1.1 3.1.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2.1 1.3 3.5 0 4.7-2.8 5.8-5.5 6.1.5.4.9 1.2.9 2.5v3.7c0 .3.2.7.8.6 4.7-1.6 8.1-6 8.1-11.2C23.5 5.85 18.35.5 12 .5z" />
                    </svg>
                    <span className="hidden sm:inline">GitHub</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block relative w-1/2">
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-pink-600/20 z-10"></div>
          <Image
            src="/LoginImage.jpg"
            fill
            priority
            quality={100}
            sizes="50vw"
            alt="Signup visual"
            className="object-cover"
          />
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

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;