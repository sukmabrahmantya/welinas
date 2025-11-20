import { ReactNode, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-[#111827] mb-2">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 bg-white border rounded-xl
              text-[#111827] placeholder:text-[#6B7280]
              transition-all duration-200 outline-none
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border-[#F97362] focus:ring-2 focus:ring-[#F97362]"
                  : "border-[#D4D4D8] focus:border-[#1BA5A5] focus:ring-2 focus:ring-[#1BA5A5]/20"
              }
              disabled:bg-[#F5F3F0] disabled:cursor-not-allowed disabled:opacity-60
              hover:border-[#1BA5A5]/50
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-[#F97362]">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[#6B7280]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
