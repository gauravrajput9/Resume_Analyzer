"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setgithubLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
    setGoogleLoading(false);
  };
  const handleGitHubLogin = async () => {
    setgithubLoading(true);
    await signIn("github", {
      callbackUrl: "/",
    });
    setgithubLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Here you can send the data to your API or auth service
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-150 bg-neutral-900 rounded-xl flex overflow-hidden shadow-xl">
        {/* Left: Form */}
        <div className="relative w-full lg:w-1/2 px-8 py-16">
          {/* Navigation Text */}
          <div className="absolute top-4 right-8 text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-white underline hover:text-gray-300"
            >
              Sign Up
            </a>
          </div>

          <form
            className="relative z-10 flex flex-col gap-5 text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-white">Sign in</h1>
            <span className="text-sm text-gray-400">or use your account</span>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-md bg-neutral-900 border-2 border-neutral-700 px-4 text-sm text-white outline-none transition focus:border-white/60 placeholder:text-gray-400"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-md bg-neutral-900 border-2 border-neutral-700 px-4 text-sm text-white outline-none transition focus:border-white/60 placeholder:text-gray-400"
              required
            />

            <span className="text-white font-bold underline">
              Or Continue With
            </span>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4 mb-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="flex items-center gap-2 border border-neutral-700 rounded-md px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
              >
                {googleLoading ? (
                  <>
                    <Loader className="animate-spin h-3 w-3" />
                    <p>Redirecting</p>
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 48 48">
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
                    <p>Continue with Google</p>
                  </>
                )}
              </button>

              {/* GitHub */}
              <button
                onClick={() => handleGitHubLogin()}
                type="button"
                className="flex items-center gap-2 border border-neutral-700 rounded-md px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
              >
                {githubLoading ? (
                  <>
                    <Loader className="animate-spin h-3 w-3" />
                    <p>Redirecting</p>
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 .5C5.65.5.5 5.85.5 12.4c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.6-1.4-2-1.4-2-1.2-.9.1-.9.1-.9 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.8-1.8-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.6 1.3 1-.3 2-.4 3.1-.4s2.1.1 3.1.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2.1 1.3 3.5 0 4.7-2.8 5.8-5.5 6.1.5.4.9 1.2.9 2.5v3.7c0 .3.2.7.8.6 4.7-1.6 8.1-6 8.1-11.2C23.5 5.85 18.35.5 12 .5z" />
                    </svg>
                    <p>Continue With Github</p>
                  </>
                )}
              </button>
            </div>

            <button className="mt-2 relative inline-flex justify-center items-center rounded-md bg-white text-black px-6 py-2 text-sm font-medium transition hover:scale-105">
              Sign In
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block relative w-1/2">
          <Image
            src="/LoginImage.jpg"
            fill
            priority
            quality={100}
            sizes="50vw"
            alt="Login visual"
            className="object-cover opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
