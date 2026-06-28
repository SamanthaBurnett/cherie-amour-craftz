type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <main className={`mx-auto max-w-6xl px-6 py-12 ${className}`}>
      {children}
    </main>
  );
}
