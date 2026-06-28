type LoadingSpinnerProps = {
  label?: string;
};

export function LoadingSpinner({ label = "Loading" }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-3 text-text-muted">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-coral" />

      <span className="text-sm">{label}</span>
    </div>
  );
}
