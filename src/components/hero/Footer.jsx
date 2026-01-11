import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 px-6 py-20 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Brand / Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Resume AI</h2>
          <p className="text-white/70 max-w-sm">
            AI-powered resume insights to optimize your resume for every job role.
          </p>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <a href="mailto:rajputgaurav8135@gmail.com" className="hover:text-white/90">
              rajputgaurav8135@gmail.com
            </a>
            <span>|</span>
            <a href="tel:+917409472187" className="hover:text-white/90">
              +91 7409472187
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">Navigation</h3>
          <a href="#hero" className="text-white/70 hover:text-white transition">Home</a>
          <a href="#features" className="text-white/70 hover:text-white transition">Features</a>
          <a href="#pricing" className="text-white/70 hover:text-white transition">Pricing</a>
          <a href="#contact" className="text-white/70 hover:text-white transition">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://twitter.com/" target="_blank" className="text-white/70 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" className="text-white/70 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/" target="_blank" className="text-white/70 hover:text-white transition">
              <FaGithub size={20} />
            </a>
            <a href="https://facebook.com/" target="_blank" className="text-white/70 hover:text-white transition">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-16 text-center text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Resume AI. All rights reserved.
      </div>
    </footer>
  );
};
