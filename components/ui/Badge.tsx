type BadgeProps = {
  children: React.ReactNode;
  variant?: "new" | "custom" | "sold-out" | "low-stock";
};

export function Badge({ children, variant = "new" }: BadgeProps) {
  const variants = {
    new: "bg-blush text-text",
    custom: "bg-butter text-text",
    "sold-out": "bg-error text-white",
    "low-stock": "bg-warning text-text",
  };

  return (
    <span
      className={`inline-flex rounded-button px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
