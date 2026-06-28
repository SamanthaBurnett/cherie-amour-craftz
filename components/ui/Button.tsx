type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles = "rounded-button px-6 py-3 text-sm font-medium transition";

  const variants = {
    primary: "bg-coral text-white hover:bg-coral-hover",
    secondary: "border border-coral bg-white text-text hover:bg-[#FFF4F2]",
    ghost: "text-text hover:text-coral",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
