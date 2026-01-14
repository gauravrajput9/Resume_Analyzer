"use client";
import { Sparkles } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 px-6 py-20 mt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-950/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Resume AI
              </h2>
            </div>
            <p className="text-white/60 leading-relaxed">
              AI-powered resume insights to optimize your resume for every job
              role. Get hired faster.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:rajputgaurav8135@gmail.com"
                className="text-white/70 hover:text-purple-400 transition-colors"
              >
                rajputgaurav8135@gmail.com
              </a>
              <a
                href="tel:+917409472187"
                className="text-white/70 hover:text-purple-400 transition-colors"
              >
                +91 7409472187
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg">Quick Links</h3>
            {["Home", "Features", "Pricing"].map((item) =>
              item === "Home" ? (
                <>
                  {" "}
                  <a
                    key={item}
                    href={`/`}
                    className="text-white/60 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </>
              ) : (
                <>
                  {" "}
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </>
              )
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg">
              Connect With Us
            </h3>

            <div className="flex gap-3">
              {[
                { icon: FaTwitter, label: "Twitter", href: "#" },
                { icon: FaLinkedin, label: "LinkedIn", href: "#" },
                { icon: FaGithub, label: "GitHub", href: "#" },
                { icon: FaFacebook, label: "Facebook", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 
                   flex items-center justify-center
                   hover:bg-purple-600/20 hover:border-purple-500/50
                   hover:scale-110 active:scale-95
                   transition-all duration-300 group"
                >
                  <Icon className="text-white/70 text-lg group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Resume AI. All rights reserved.
            Built with ❤️ for job seekers.
          </p>
        </div>
      </div>
    </footer>
  );
};
