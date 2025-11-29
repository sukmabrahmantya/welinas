import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "teal" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#1E293B] text-white hover:bg-[#1E293B]/90 active:bg-[#1E293B]/80 shadow-md hover:shadow-lg",
    secondary:
      "bg-brand-gold text-[#1E293B] hover:bg-brand-gold/90 active:bg-brand-gold/80 shadow-md hover:shadow-lg",
    teal: "bg-[#1BA5A5] text-white hover:bg-[#1BA5A5]/90 active:bg-[#1BA5A5]/80 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white active:bg-[#1E293B]/90",
    ghost: "text-[#1E293B] hover:bg-[#F5F3F0] active:bg-[#D4D4D8]/30",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
