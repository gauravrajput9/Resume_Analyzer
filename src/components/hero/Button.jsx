'use client'

export const Button = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none disabled:opacity-50";

  const variants = {
    /* Existing */
    default: "bg-white text-black hover:bg-gray-100",
    ghost: "text-white hover:bg-white/10",
    gradient:
      "bg-gradient-to-b from-white via-white/90 to-white/60 text-black  active:scale-95",

    /* ✅ NEW – Navbar themed */
    navGhost:
      "bg-white/5 text-white/80 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-purple-500/40",

    navGradient:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-pink-500/40 hover:scale-[1.03] active:scale-95",
  };

  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-9 px-3 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
