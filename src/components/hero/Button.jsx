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
    default: "bg-white text-black hover:bg-gray-100",
    ghost: "text-white hover:bg-white/10",
    gradient:
      "bg-gradient-to-b from-white via-white/90 to-white/60 text-black hover:scale-105 active:scale-95",
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